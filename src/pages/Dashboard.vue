<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-img class="col" src="../assets/corona.jpg">
            <div class="absolute-bottom">
              <div class="text-h4 text-secondary">{{ totalAffected }}</div>
              <div class="text-subtitle2">reported cases</div>
            </div>
          </q-img>
          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="primary" icon="pie_chart" to="/piechart" />
            <q-btn flat round color="primary" icon="show_chart" to="/timeline" />
            <q-btn flat round color="primary" icon="map" to="/map" />
          </q-card-actions>
        </q-card-section>
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
