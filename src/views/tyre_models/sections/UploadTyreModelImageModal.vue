<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(uploadImage)">
      <section class="mb-4">
        <label>Image</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile, required: true }"
          name="Image"
        >
          <file-input
            v-model="image"
            :invalid="!!validationContext.errors[0]"
            placeholder="Browse files"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
        </validation-provider>
      </section>

      <div class="w-full float-right flex gap-2 mt-2">
        <c-button
          class="mr-2"
          @click="$emit('close')"
        >
          Cancel
        </c-button>
        <c-button
          :disabled="invalid"
          type="submit"
          variant="primary"
        >
          Upload Image
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import CButton from "@/components/ui/CustomButton.vue";
  import FileInput from "@/components/forms/FileInput.vue";
  import {isImageFile} from "@/@core/utils/validations/validations";

  export default {
    name: "UploadTyreModelImageModal",
    components: {CButton, FileInput},
    data() {
      return {
        image: null
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      uploadImage() {
        this.$emit("upload", this.image);
      }
    }
  }
</script>

<style scoped>

</style>