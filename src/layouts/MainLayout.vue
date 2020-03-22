<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-toolbar-title>COVID-19 Dashboard</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuItem" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.routerTarget">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: true,
      menuItem: [
        {
          icon: 'home',
          label: 'Hauptseite',
          routerTarget: 'dashboard',
          separator: true
        },
        {
          icon: 'pie_chart',
          label: 'Gesamtübersicht',
          routerTarget: 'piechart',
          separator: false
        },
        {
          icon: 'show_chart',
          label: 'Zeitverlauf',
          routerTarget: 'timeline',
          separator: false
        },
        {
          icon: 'map',
          label: 'Karte',
          routerTarget: 'map',
          separator: false
        }
      ]
    }
  }
}
</script>
