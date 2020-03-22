<template>
    <div>
      <h6>Total: {{ totalAffected }}</h6>
      <apexchart width="500px" type="donut" ref="chart" :options="options" :series="series"></apexchart>
      <p class="text-weight-bold justify-center">last updated: {{ date }}</p>
    </div>
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
      series: [],
      options: {
        chart: {
          type: 'donut'
        },
        labels: ['Deaths', 'Recovered', 'Sick'],
        dataLabels: {
          enabled: true
        },
        theme: {
          /*
          palette: 'palette3'
          */
          monochrome: {
            enabled: true,
            color: '#26A69A'
          }
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
        legend: {
          position: 'right',
          offsetY: 0,
          height: 100,
          show: true
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false
              }
            }
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
