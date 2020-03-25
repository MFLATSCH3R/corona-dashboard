<template>
  <div id="mapContainer" class="map" />
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
export default {
  name: 'Map',
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      const map = new Map({
        target: 'mapContainer',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 7
        })
      })
      map.getLayers()
      // api https://coronavirus-tracker-api.herokuapp.com/v2/locations
    }
  }
}
</script>

<style scoped>
  .map {
    min-height: inherit;
  }
</style>
