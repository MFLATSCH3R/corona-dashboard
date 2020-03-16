<template>
  <q-page padding>
    <apexchart height="400" width="600" type="area" ref="areaChart" :options="chartOptions" :series="series"></apexchart>
  </q-page>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'AreaChart',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      series: [{
        name: 'Global Confirmed Cases',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          width: 400,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: []
        }
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.get('https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/PmO6oUpJizhI0jM8pu3n/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true')
        .then((response) => {
          this.rawData = response.data
          // redraw chart
          this.updateChart(this.processData(this.rawData))
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
      const timeSeries = []
      const seriesData = []

      data.features.forEach((item) => {
        function formatDate (ms) {
          const date = new Date(ms)
          return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
        }
        const timeEntry = formatDate(item.attributes.Report_Date)
        timeSeries.push(timeEntry)
        seriesData.push(item.attributes.Total_Confirmed)
      })

      return {
        series: seriesData,
        categories: timeSeries
      }
    },
    updateChart (data) {
      this.series = [{
        data: data.series
      }]
      this.$refs.areaChart.updateOptions({
        xaxis: {
          categories: data.categories
        }
      })
    }
  }
}
</script>
