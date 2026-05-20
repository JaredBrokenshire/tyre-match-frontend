<template>
  <div class="page">
    <page-header />

    <div class="content padding-x py-8">
      <slot />
    </div>

    <page-footer />
  </div>
</template>

<script>
  import PageFooter from "@/components/layout/PageFooter.vue";
  import PageHeader from "@/components/layout/PageHeader.vue";

  export default {
    name: "DefaultLayout",
    components: {
      PageFooter,
      PageHeader
    }
  }
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f1f1f1;
}

.content {
  flex-grow: 1
}
</style>