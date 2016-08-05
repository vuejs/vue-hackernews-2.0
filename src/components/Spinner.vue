<template>
  <svg class="spinner" :class="{ show: show }" width="44px" height="44px" viewBox="0 0 44 44">
    <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
  </svg>
</template>

<script>
export default {
  props: ['show']
}
</script>

<style>
.spinner {
  opacity: 0;
  transition: opacity .3s ease;
  animation: rotator 1.4s linear infinite;
  animation-play-state: paused;
}

.spinner.show {
  opacity: 1;
  animation-play-state: running;
}

@keyframes rotator {
  0% { transform: scale(0.5) rotate(0deg); }
  100% { transform: scale(0.5) rotate(270deg); }
}

.spinner .path {
  stroke: #4fc08d;
  stroke-dasharray: 126;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}

@keyframes dash {
 0% { stroke-dashoffset: 126; }
 50% {
   stroke-dashoffset: 32;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: 126;
   transform:rotate(450deg);
 }
}
</style>
