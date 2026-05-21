<template>
  <div class="bg-white shadow-sm rounded-lg p-4">
    <div
      v-if="title"
      class="text-2xl font-bold"
    >
      {{ title }}
    </div>

    <slot />
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      title: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style scoped>
</style>