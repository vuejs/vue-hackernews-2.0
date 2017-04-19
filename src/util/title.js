export const setTitle = (title, context) => {
  title = `Vue HN 2.0 | ${title}`
  if (context) {
    // server
    context.title = title
  } else {
    // client
    document.title = title
  }
}
