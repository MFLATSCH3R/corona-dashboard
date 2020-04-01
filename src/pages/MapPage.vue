<template>
  <ol-map :data="mapData" :x="13.000" :y="47.790" class="map-container" />
</template>

<script>
import map from './map/OLCSMap.vue'
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
