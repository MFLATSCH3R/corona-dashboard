<template>
  <q-page padding>
    <div id="map" class="map" />
  </q-page>
</template>

<script>
import Cesium from 'cesium'
import * as olUtil from 'ol/util'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import OLCesium from 'olcs/OLCesium.js'
export default {
  name: 'OLCSMap',
  mounted () {
    this.initMap('map')
  },
  methods: {
    initMap (container) {
      window.Cesium = Cesium
      console.info('running on OpenLayers version ' + olUtil.VERSION)
      this.map = new Map({
        target: container,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([13.000, 47.790], 'EPSG:4326', 'EPSG:3857'),
          zoom: 6
        })
      })
      this.ol3d = new OLCesium({
        map: this.map
      })
      this.ol3d.setEnabled(true)
    }
  }
}
</script>

<style scoped>
  .map {
    min-height: inherit;
  }
</style>
