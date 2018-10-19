<template>
  <div class="not-found-view">
    <h1>Page not found.</h1>
    <small>The page you requested was not found. Please follow one of the links in menu.</small>
  </div>
</template>

<script>

export default {
  name: 'not-found-view',

  title () {
    return 'View not found';
  }
}
</script>