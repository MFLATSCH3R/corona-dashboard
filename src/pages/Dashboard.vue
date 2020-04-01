<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card">
        <q-img src="../assets/corona.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">Pie-Chart</div>
        </div>
        </q-img>
        <q-card-actions align="right">
          <q-btn
            round
            color="accent"
            icon="pie_chart"
            to="piechart">
            <q-tooltip>View Graph</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
        <q-card class="my-card">
        <q-img src="../assets/corona.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">Timeline</div>
        </div>
        </q-img>
        <q-card-actions align="right">
          <q-btn
            round
            color="accent"
            icon="show_chart"
            to="timeline">
            <q-tooltip>View Graph</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
      <q-card class="my-card">
        <q-img src="../assets/corona.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">2D Map</div>
        </div>
        </q-img>
        <q-card-actions align="right">
          <q-btn
            round
            color="accent"
            icon="map"
            to="map">
            <q-tooltip>View Map</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
      <q-card class="my-card">
        <q-img src="../assets/corona.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">3D Map</div>
        </div>
        </q-img>
        <q-card-actions align="right">
          <q-btn
            round
            color="accent"
            icon="map"
            to="cesium">
            <q-tooltip>View 3D-Map</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      totalAffected: '400.000',
      deaths: '15.000'
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 300px
</style>
