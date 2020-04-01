<template>
  <q-page class="flex flex-center">
    <div>
      <h6>Reported Cases: {{ totalAffected }}</h6>
      <piechart :series="series" />
      <p>last updated: {{ date }}</p>
    </div>
  </q-page>
</template>

<script>
import piechart from './charts/Donut.vue'
import * as moment from 'moment'
export default {
  name: 'PagePieChart',
  components: {
    piechart: piechart
  },
  data () {
    return {
      rawData: null,
      totalAffected: 0,
      date: null,
      series: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      // https://covidapi.info/api/v1/global
      // https://corona.lmao.ninja/all
      this.$axios.get('https://corona.lmao.ninja/all')
        .then((response) => {
          this.rawData = response.data
          // redraw chart
          this.formatData(this.rawData)
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
    formatData (data) {
      this.date = moment(new Date(data.updated)).format('DD.MM.YYYY HH:MM')
      this.totalAffected = parseFloat(data.cases).toLocaleString('de')
      const sick = data.cases - data.deaths - data.recovered
      this.series = [data.deaths, data.recovered, sick]
      /*
      this.date = moment(new Date(data.date)).format('DD.MM.YYYY HH:MM')
      this.totalAffected = parseFloat(data.result.confirmed).toLocaleString('de')
      const sick = data.result.confirmed - data.result.deaths - data.result.recovered
      this.series = [data.result.deaths, data.result.recovered, sick]
      */
    }
  }
}
</script>
