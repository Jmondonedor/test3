
<script>
export default {
  name: "page-not-found",
  data() {
    return {
      unavailableRoute: null,
    }
  },
  created() {
    this.unavailableRoute = this.$route.path;
  }
}
</script>

<template>
  <div class="w-full">
    <h1>{{ $t('page-not-found.title') }}</h1>
    <p>{{ $t('page-not-found.message', { route: unavailableRoute }) }}</p>
    <pv-button icon="pi pi-home" :label="$t('page-not-found.go-home')" @click="$router.push('/home')" />
  </div>
</template>

<style scoped>
</style>