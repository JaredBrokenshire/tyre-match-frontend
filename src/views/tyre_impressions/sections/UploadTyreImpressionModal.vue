<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(uploadTyreImpressionImage)">
      <section class="mb-4">
        <label>Tyre Impression Image</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile, required:true }"
          name="Tyre Impression Image"
        >
          <file-input
            v-model="tyreImpressionImage"
            :invalid="!!validationContext.errors[0]"
            placeholder="Browse files"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
        </validation-provider>
      </section>

      <div class="float-right flex gap-2 mt-2">
        <c-button
          class="mr-2"
          @click="$emit('close')"
        >
          Cancel
        </c-button>
        <c-button
          :disabled="invalid || loading"
          type="submit"
          variant="primary"
        >
          Upload
        </c-button>
      </div>
    </form>

  </validation-observer>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import FileInput from "@/components/forms/FileInput.vue";
  import {isImageFile} from "@/@core/utils/validations/validations";
  import TyreImpressionService from "@/services/TyreImpressionService";

  export default {
    name: "UploadTyreImpressionModal",
    components: {CButton, FileInput},
    data() {
      return {
        loading: false,
        tyreImpressionImage: null,
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      async uploadTyreImpressionImage() {
        this.loading = true
        try {
          const res = await TyreImpressionService.upload(this.tyreImpressionImage)

          HelperService.successToast(this.$toast, "Tyre Impression uploaded successfully")
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not upload tyre impression, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>