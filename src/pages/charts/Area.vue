<template>
  <div id="chart">
    <div class="toolbar">
      <button id="one_month" @click="updateData('one_month')" :class="{active: selection==='one_month'}">1M</button>
      <button id="six_months" @click="updateData('six_months')" :class="{active: selection==='six_months'}">6M</button>
      <button id="one_year" @click="updateData('one_year')" :class="{active: selection==='one_year'}">1Y</button>
      <button id="all" @click="updateData('all')" :class="{active: selection==='all'}">ALL</button>
    </div>
    <apexchart height="600" width="1000" type="area" ref="areaChart" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import * as moment from 'moment'
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
      options: {
        chart: {
          type: 'area',
          height: 600
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        annotations: {
          xaxis: [{
            x: new Date('12 Feb 2020 12:00').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Couting Methods changed',
              style: {
                color: '#fff',
                background: '#775DD0'
              }
            }
          }]
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 8
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        selection: 'one_year'
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
        seriesData.push([item.attributes.Report_Date, item.attributes.Total_Confirmed])
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
    },
    updateData (timeline) {
      debugger
      this.selection = timeline
      switch (timeline) {
        case 'one_week':
        case 'one_month':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(1, 'months').valueOf(),
              max: new Date().getTime()
            }
          }
      }
    }
  }
}
</script>
