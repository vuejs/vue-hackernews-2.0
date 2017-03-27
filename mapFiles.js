module.exports = function createMapper (serverStats, clientStats) {
  const fileMap = createFileMap(serverStats, clientStats)
  return function mapFiles (files) {
    const res = new Set()
    for (let i = 0; i < files.length; i++) {
      const mapped = fileMap.get(files[i])
      for (let j = 0; j < mapped.length; j++) {
        res.add(mapped[j])
      }
    }
    return Array.from(res)
  }
}

function createFileMap (serverStats, clientStats) {
  const fileMap = new Map()
  serverStats.assets
    .filter(asset => /\.js$/.test(asset.name))
    .forEach(asset => fileMap.set(asset.name, mapFile(asset.name, serverStats, clientStats)))
  return fileMap
}

function mapFile (file, serverStats, clientStats) {
  // 1. server files -> server chunk ids
  const serverChunkIds = new Set()
  serverStats.assets.forEach(asset => {
    if (asset.name === file) {
      asset.chunks.forEach(id => {
        const chunk = serverStats.chunks.find(c => c.id === id)
        if (!chunk.initial) {
          serverChunkIds.add(id)
        }
      })
    }
  })

  // 2. server chunks -> module identifiers
  const moduleIdentifiers = []
  serverStats.modules.forEach(module => {
    if (module.chunks.some(id => serverChunkIds.has(id))) {
      moduleIdentifiers.push(module.identifier)
    }
  })

  // 3. module identifiers -> client chunk ids
  const clientChunkIds = new Set()
  moduleIdentifiers.forEach(identifier => {
    const clientModule = clientStats.modules.find(m => m.identifier === identifier)
    if (clientModule && clientModule.chunks.length === 1) { // ignore modules duplicated in multiple chunks
      clientChunkIds.add(clientModule.chunks[0])
    }
  })

  // 4. client chunks -> client files
  const clientFiles = new Set()
  Array.from(clientChunkIds).forEach(id => {
    const chunk = clientStats.chunks.find(chunk => chunk.id === id)
    if (!chunk.initial) {
      chunk.files.forEach(file => clientFiles.add(file))
    }
  })

  return Array.from(clientFiles)
}
