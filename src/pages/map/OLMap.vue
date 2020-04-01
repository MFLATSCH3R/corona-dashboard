<template>
  <div id="mapContainer" class="map" />
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import Feature from 'ol/Feature'
import { Point, Circle } from 'ol/geom'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style } from 'ol/style'
import { transform } from 'ol/proj'
import CircleStyle from 'ol/style/Circle'
export default {
  name: 'Map',
  mounted () {
    this.initMap()
  },
  created () {
    document.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy () {
    document.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    initMap () {
      this.markerLayer = new VectorLayer({
        source: new VectorSource({
          wrapX: false
        }),
        zIndex: 200
      })

      this.map = new Map({
        target: 'mapContainer',
        layers: [
          this.markerLayer,
          new TileLayer({
            zIndex: 100,
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 7
        })
      })

      this.map.on('postrender', this.onPostRender)

      this.getBrowserLocation()
      this.getData()
    },
    onPostRender (e) {
      this.map.updateSize()
    },
    getBrowserLocation (callback) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
          const x = location.coords.longitude
          const y = location.coords.latitude
          this.map.getView().setCenter(transform([parseFloat(x), parseFloat(y)], 'EPSG:4326', 'EPSG:3857'))
        })
      }
    },
    getData () {
      this.$axios({
        url: 'https://coronavirus-tracker-api.herokuapp.com/v2/locations',
        method: 'GET'
      }).then((response) => {
        this.processData(response.data)
      }).catch((err) => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'failed loading data',
          icon: 'report_problem'
        })
        console.log(err)
      })
    },
    processData (data) {
      const markerSource = this.markerLayer.getSource()
      data.locations.forEach(item => {
        const x = parseFloat(item.coordinates.longitude)
        const y = parseFloat(item.coordinates.latitude)
        const confirmed = item.latest.confirmed
        const feature = new Feature(new Circle(transform([x, y], 'EPSG:4326', 'EPSG:3857')))
        feature.setStyle(this.getStyle(x, y, confirmed))
        markerSource.addFeature(feature)
      })
    },
    getStyle (x, y, val) {
      /*
      return new Style({
        fill: new Fill({
          color: 'red'
        }),
        stroke: new Stroke({
          color: 'black',
          width: 2
        })
      })
      */

      const rad = this.getFeatureCategory(parseInt(val))

      return new Style({
        geometry: new Point(transform([x, y], 'EPSG:4326', 'EPSG:3857')),
        image: new CircleStyle({
          radius: rad,
          fill: new Fill({
            color: 'rgba(233,74,47,0.66)'
          }),
          stroke: new Stroke({
            color: 'rgba(0,0,0,0.60)',
            width: 2
          })
        })
      })
    },
    getFeatureCategory (val) {
      if (isNaN(val)) {
        return 12
      }
      if (val > 50000) {
        return 50
      } else if (val > 25000 && val <= 50000) {
        return 34
      } else if (val > 10000 && val <= 25000) {
        return 24
      } else if (val > 5000 && val <= 10000) {
        return 18
      } else if (val > 1000 && val <= 5000) {
        return 14
      } else {
        return 12
      }
    }
  }
}
</script>

<style scoped>
  .map {
    min-height: inherit;
  }
</style>
