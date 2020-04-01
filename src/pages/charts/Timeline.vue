<template>
  <div id="chart">
    <div class="toolbar">
      <button id="one_week" @click="updateData('one_week')" :class="{active: selection==='one_week'}">1W</button>
      <button id="one_month" @click="updateData('one_month')" :class="{active: selection==='one_month'}">1M</button>
      <button id="three_months" @click="updateData('three_months')" :class="{active: selection==='three_months'}">3M</button>
      <button id="six_months" @click="updateData('six_months')" :class="{active: selection==='six_months'}">6M</button>
      <button id="all" @click="updateData('all')" :class="{active: selection==='all'}">ALL</button>
    </div>
    <div class="q-gutter-sm">
      <q-checkbox v-model="countryArr" val="Austria" label="Austria" @input="updateCountries()" />
      <q-checkbox v-model="countryArr" val="Germany" label="Germany" @input="updateCountries()" />
      <q-checkbox v-model="countryArr" val="Italy" label="Italy" @input="updateCountries()" />
      <q-checkbox v-model="countryArr" val="Spain" label="Spain" @input="updateCountries()" />
      <q-checkbox v-model="countryArr" val="US" label="USA" @input="updateCountries()" />
      <q-checkbox v-model="countryArr" val="Globally Confirmed Cases" label="Globally Confirmed Cases" @input="updateCountries()" />
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
      countryArr: ['Austria', 'Germany', 'Italy', 'Spain', 'US', 'Globally Confirmed Cases'],
      selection: 'one_year',
      rawData: [],
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
          curve: 'straight'
        },
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              width: '390px'
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        annotations: {
          xaxis: [{
            x: new Date('12 Feb 2020 06:00').getTime(),
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
          palette: 'palette1'
          /*
          monochrome: {
            enabled: true,
            color: '#26A69A'
          }
          */
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.8,
            opacityTo: 0.4,
            stops: [50, 100]
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
      // this.$axios.get('https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/PmO6oUpJizhI0jM8pu3n/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true')
      this.$axios({
        url: 'https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1',
        method: 'GET'
      }).then((response) => {
        this.updateChart(this.processData(response.data))
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
      try {
        const seriesArray = []
        let series = []
        const tempData = {}
        // globally confirmed cases
        data.locations.forEach((item) => {
          const cases = item.timelines.confirmed.timeline
          const arr = Object.keys(cases)
          arr.forEach((entry) => {
            const timestamp = new Date(entry).getTime()
            const existingEntry = tempData[timestamp]
            if (existingEntry) {
              tempData[timestamp] = tempData[timestamp] + cases[entry]
            } else {
              tempData[timestamp] = cases[entry]
            }
          })
        })
        Object.keys(tempData).forEach((timestamp) => {
          series.push([parseFloat(timestamp), tempData[timestamp]])
        })
        seriesArray.push({
          name: 'Globally Confirmed Cases',
          data: series
        })
        series = []

        // By country
        const countries = ['Austria', 'Germany', 'Italy', 'Spain', 'US']
        data.locations.forEach((item) => {
          if (countries.includes(item.country)) {
            const cases = item.timelines.confirmed.timeline
            const arr = Object.keys(cases)
            arr.forEach((entry) => {
              const timestamp = new Date(entry).getTime()
              series.push([parseFloat(timestamp), cases[entry]])
            })
            seriesArray.push({
              name: item.country,
              data: series
            })
            series = []
          }
        })

        return seriesArray
      } catch (e) {
        console.log(e)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'failed processing data',
          icon: 'report_problem'
        })
        return null
      }
    },
    updateChart (data) {
      this.rawData = data
      this.series = data
      /*
      this.series = [{
        data: data
      }]
      */
    },
    updateData (timeline) {
      this.selection = timeline
      const maxDate = this.series[0].data[this.series[0].data.length - 1][0] || new Date().getTime()
      switch (timeline) {
        case 'one_week':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(1, 'weeks').valueOf(),
              max: maxDate
            }
          }
          break
        case 'one_month':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(1, 'months').valueOf(),
              max: maxDate
            }
          }
          break
        case 'three_months':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(3, 'months').valueOf(),
              max: maxDate
            }
          }
          break
        case 'six_months':
          this.options = {
            xaxis: {
              min: moment(new Date()).subtract(6, 'months').valueOf(),
              max: maxDate
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
    },
    updateCountries () {
      const raw = this.rawData
      const newSeries = []
      Object.keys(raw).forEach((item) => {
        if (this.countryArr.includes(raw[item].name)) {
          newSeries.push(raw[item])
        }
      })
      this.series = newSeries
    }
  }
}
</script>
