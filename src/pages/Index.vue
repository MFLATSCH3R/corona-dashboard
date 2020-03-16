<template>
  <q-page class="flex flex-center">
    <pie-chart />
    <area-chart />
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
  }
}
</script>
