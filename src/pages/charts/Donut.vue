<template>
  <apexchart width="500px" type="donut" ref="chart" :options="options" :series="series"></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    series: Array
  },
  data () {
    return {
      rawData: null,
      // series: this.seriesData,
      options: {
        chart: {
          type: 'donut'
        },
        labels: ['Deaths', 'Recovered', 'Sick'],
        dataLabels: {
          enabled: true
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#26A69A'
          }
        },
        responsive: [{
          breakpoint: 490,
          options: {
            chart: {
              width: '400px'
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
  watch: {
    series: {
      handler (newVal, oldVal) {
        this.series = newVal
      }
    }
  }
}
</script>
