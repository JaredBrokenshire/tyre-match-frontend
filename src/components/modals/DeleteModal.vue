<template>
  <div>
    <div>Are you sure you want to delete this {{ $props.type }}? This action can't be undone.</div>
    <div class="mt-8 w-full flex justify-end items-center gap-2">
      <div class="w-fit">
        <c-button @click="$emit('close')">Cancel</c-button>
      </div>
      <div class="w-fit">
        <c-button
          variant="danger"
          @click="$emit('delete')"
        >
          Delete
        </c-button>
      </div>
    </div>
  </div>
</template>

<script>
  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: "DeleteModal",
    components: {CButton},
    props: {
      type: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>