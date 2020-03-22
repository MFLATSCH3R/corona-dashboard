<template>
  <ol-map :data="mapData" class="map-container" />
</template>

<script>
import map from './map/OLMap.vue'
export default {
  name: 'Map',
  components: {
    'ol-map': map
  },
  data () {
    return {
      mapData: null
    }
  }
}
</script>

<style scoped>
  .map-container {
    width: inherit;
    height: calc(100vh - 50px);
  }
</style>
