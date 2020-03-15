<template>
  <q-page class="flex flex-center">
    <area-chart />
  </q-page>
</template>

<script>
import areachart from './charts/Area.vue'
export default {
  name: 'PageIndex',
  components: {
    'area-chart': areachart
  }
}
</script>
