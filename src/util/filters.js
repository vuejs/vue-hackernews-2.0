export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time, fromTime = null) {
    const between = (fromTime || Date.now()) / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(Math.floor(between / 60) || 0, ' minute')
    } else if (between < 86400) {
        return pluralize(Math.floor(between / 3600) || 0, ' hour')
    } else {
        return pluralize(Math.floor(between / 86400) || 0, ' day')
    }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
