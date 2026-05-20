<template>
  <button
    :class="`btn ${colours}`"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
  export default {
    name: "CButton",
    props: {
      type: {
        type: String,
        default: "button",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      variant: {
        type: String,
        default: "gray",
      }
    },
    computed: {
      colours() {
        switch (this.variant) {
        case "primary":
          return "bg-primary enabled:hover:bg-primary-dark";
        case "danger":
          return "bg-danger enabled:hover:bg-danger-dark";
        case "gray":
        default:
          return "bg-gray enabled:hover:bg-gray-dark"
        }
      }
    }
  };
</script>

<style scoped>

</style>