<template>
  <div id="chart">
    <div class="toolbar">
      <button id="one_week" @click="updateData('one_week')" :class="{active: selection==='one_week'}">1W</button>
      <button id="one_month" @click="updateData('one_month')" :class="{active: selection==='one_month'}">1M</button>
      <button id="three_months" @click="updateData('three_months')" :class="{active: selection==='three_months'}">3M</button>
      <button id="six_months" @click="updateData('six_months')" :class="{active: selection==='six_months'}">6M</button>
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
      selection: 'one_year',
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
        responsive: [{
          breakpoint: 450,
          options: {
            chart: {
              width: '450'
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        annotations: {
          xaxis: [{
            x: new Date('12 Feb 2020 12:00').getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Couting Methods changed',
              style: {
                color: '#FFFFFF',
                background: '#CE63E0'
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
        theme: {
          monochrome: {
            enabled: true,
            color: '#26A69A'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.9,
            opacityTo: 0.7,
            stops: [0, 100]
          }
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
      const seriesData = []
      data.features.forEach((item) => {
        seriesData.push([item.attributes.Report_Date, item.attributes.Total_Confirmed])
      })
      return seriesData
    },
    updateChart (data) {
      this.series = [{
        data: data
      }]
    },
    updateData (timeline) {
      this.selection = timeline
      switch (timeline) {
        case 'one_week':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(1, 'weeks').valueOf(),
              max: new Date().getTime()
            }
          }
          break
        case 'one_month':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(1, 'months').valueOf(),
              max: new Date().getTime()
            }
          }
          break
        case 'three_months':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(3, 'months').valueOf(),
              max: new Date().getTime()
            }
          }
          break
        case 'six_months':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(6, 'months').valueOf(),
              max: new Date().getTime()
            }
          }
          break
        case 'all':
          this.options = {
            xaxis: {
              min: undefined,
              max: undefined
            }
          }
          break
        default:
          this.options = {
            xaxis: {
              min: undefined,
              max: undefined
            }
          }
      }
    }
  }
}
</script>
