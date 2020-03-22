<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row justify-center">
        <pie-chart />
      </div>
      <div class="row justify-center">
        <area-chart />
      </div>
    </div>
  </q-page>
</template>

<script>
import areachart from './charts/Area.vue'
import piechart from './charts/Donut.vue'
export default {
  name: 'PageIndex',
  components: {
    'area-chart': areachart,
    'pie-chart': piechart
  },
  data () {
    return {
      slide: 'style',
      lorem: 'Demo Text'
    }
  }
}
</script>
