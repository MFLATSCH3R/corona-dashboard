<template>
  <q-page class="flex flex-center">
    <areachart series="series" />
  </q-page>
</template>

<script>
import areachart from './charts/Timeline.vue'
export default {
  name: 'PageAreaChart',
  components: {
    areachart: areachart
  },
  data () {
    return {
      series: [{
        name: 'Globally confirmed cases',
        data: []
      }]
    }
  },
  mouned () {
    // this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.get('https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/PmO6oUpJizhI0jM8pu3n/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true')
        .then((response) => {
          this.rawData = response.data
          this.processData(this.rawData)
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
      const seriesData = []
      data.features.forEach((item) => {
        seriesData.push([item.attributes.Report_Date, item.attributes.Total_Confirmed])
      })
      this.series = [{
        name: 'Globally confirmed cases',
        data: seriesData
      }]
    }
  }
}
</script>
