<template>
  <component
    :is="layout"
    id="app"
    class="d-flex flex-column"
  >
    <template #default>
      <router-view />
    </template>
  </component>
</template>

<script>
  const LayoutDefault = () => import('@/layouts/LayoutDefault.vue');

  export default {
    name: "App",
    components: {
      LayoutDefault,
    },
    computed: {
      layout() {
        return 'layout-default'
      }
    }
  };
</script>

<style></style>

