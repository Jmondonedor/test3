<script>
import LanguageSwitcher from "@/public/components/language-switcher.component.vue";

export default {
  name: "App",
  components: {LanguageSwitcher},
  data() {
    return {
      drawer: false,
      items: [
        { label: 'option.home', to: '/home' },
        { label: 'option.appointments', to: '/appointments' },
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />
  <div class="layout-wrapper">
    <header>
      <pv-toolbar class="bg-primary">
        <template #start>
          <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer" aria-label="Menu" />
          <img src="https://logo.clearbit.com/healthedge.com" alt="HealthEdge Logo" height="40" class="ml-2" />
          <h3 class="ml-2">Converge Without Limits</h3>
        </template>
        <template #center>
          <div class="flex">
            <pv-button v-for="item in items" :key="item.label" class="p-button-text mx-1">
              <router-link :to="item.to" class="text-white no-underline">{{ $t(item.label) }}</router-link>
            </pv-button>
          </div>
        </template>
        <template #end>
          <language-switcher />
        </template>
      </pv-toolbar>
      <pv-drawer v-model:visible="drawer" />
    </header>
    <main class="flex-grow-1">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  flex: 0 0 auto;
}

main {
  flex: 1 0 auto;
  padding: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.no-underline {
  text-decoration: none;
}
</style>