<template>
  <q-page padding>
    <div id='cesiumContainer'/>
  </q-page>
</template>

<script>
import * as Cesium from 'cesium'
import Viewer from 'cesium/Source/Widgets/Viewer/Viewer'
import buildModuleUrl from 'cesium/Source/Core/buildModuleUrl'
import 'cesium/Source/Widgets/widgets.css'
export default {
  name: 'CesiumViewer',
  data () {
    return {}
  },
  mounted () {
    this.initViewer('cesiumContainer')
  },
  methods: {
    initViewer (container) {
      buildModuleUrl.setBaseUrl('https://unpkg.com/cesium/Build/Cesium/Cesium.js')
      this.viewer = new Viewer(container, {
        animation: false,
        timeline: false,
        terrainProvider: Cesium.createWorldTerrain()
      })
      this.viewer.clock.shouldAnimate = false
    }
  }
}
</script>

<style scoped>
  #cesiumContainer {
    min-height: inherit;
  }
</style>
