<template>
  <q-page padding>
    <h2>Total Affected: {{ totalAffected }}</h2>
    <apexchart height="380" width="800" type="donut" ref="chart" :options="chartOptions" :series="series"></apexchart>
    <h6>updated: {{ date }}</h6>
  </q-page>
</template>

<script>
import * as moment from 'moment'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      rawData: null,
      totalAffected: 0,
      date: null,
      series: [40, 60, 100, 40, 999],
      chartOptions: {
        chart: {
          width: 380,
          type: 'donut'
        },
        labels: ['Deaths', 'Recovered', 'Sick'],
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230
        }
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.get('https://corona.lmao.ninja/all')
        .then((response) => {
          this.rawData = response.data
          // redraw chart
          this.updateChart(this.rawData)
        }).catch((err) => {
          console.log(err)
        })
    },
    updateChart (data) {
      this.date = moment(new Date(data.updated)).format('DD.MM.YYYY HH:MM')
      this.totalAffected = parseFloat(data.cases).toLocaleString('de')
      const pending = data.cases - data.deaths - data.recovered
      this.series = [data.deaths, data.recovered, pending]
      this.$refs.areaChart.updateOptions({
        xaxis: {
          categories: ['Fatalities', 'Recovered', 'Pending']
        }
      })
    }
  }
}
</script>
