<template>
  <q-page padding>
    <cesium-viewer id="cesium-container" />
  </q-page>
</template>

<script>
import CesiumViewer from './map/Cesium.vue'
export default {
  name: 'CesiumPage',
  components: {
    'cesium-viewer': CesiumViewer
  }
}
</script>

<style scoped>
  .cesium-container {
    width: inherit;
    height: calc(100vh - 50px);
  }
</style>
