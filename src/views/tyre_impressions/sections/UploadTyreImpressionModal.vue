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

      <section
        v-if="imagePreviewUrl"
        class="mb-4"
      >
        <label>
          Reference Points
        </label>
        <small class="text-muted d-block">
          Click two points on the image that correspond to a known real-world distance.
        </small>

        <reference-point-picker
          v-model="referencePoints"
          :src="imagePreviewUrl"
        />

        <div class="w-1/4 mt-2">
          <c-button
            v-if="referencePoints.length"
            @click="referencePoints = []"
          >
            Reset Points
          </c-button>
          <small class="text-muted">
            {{ referencePoints.length }}/2 points selected
          </small>
        </div>
      </section>

      <section
        v-if="referencePoints.length === 2"
        class="mb-4"
      >
        <label>Real World Distance Between Points</label>
        <distance-calibration-input
          v-model="pixelsPerInch"
          :pixel-distance="pixelDistance"
        />
      </section>

      <div class="float-right flex gap-2 mt-2">
        <c-button
          class="mr-2"
          @click="$emit('close')"
        >
          Cancel
        </c-button>
        <c-button
          :disabled="invalid || loading || !canSubmit"
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
  import ReferencePointPicker from "@/components/image/ReferencePointPicker.vue";
  import DistanceCalibrationInput from "@/components/forms/DistanceCalibrationInput.vue";

  export default {
    name: "UploadTyreImpressionModal",
    components: {CButton, FileInput, ReferencePointPicker, DistanceCalibrationInput},
    data() {
      return {
        loading: false,
        tyreImpressionImage: null,
        imagePreviewUrl: null,
        referencePoints: [],
        realWorldDistance: 0,
        distanceUnit: "mm",
        pixelsPerInch: 0
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      },
      pixelDistance() {
        if (this.referencePoints.length !== 2) return null

        const [a, b] = this.referencePoints
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
      },
      canSubmit() {
        return this.referencePoints.length === 2
          && this.pixelsPerInch > 0
          && this.pixelsPerInch < Infinity
      },
    },
    watch: {
      tyreImpressionImage(newFile) {
        this.referencePoints = []
        this.realWorldDistance = 0

        if (this.imagePreviewUrl) {
          URL.revokeObjectURL(this.imagePreviewUrl)
        }

        this.imagePreviewUrl = newFile ? URL.createObjectURL(newFile) : null
      },
    },
    beforeDestroy() {
      if (this.imagePreviewUrl) {
        URL.revokeObjectURL(this.imagePreviewUrl)
      }
    },
    methods: {
      async uploadTyreImpressionImage() {
        this.loading = true
        try {
          const res = await TyreImpressionService.create({
            pixels_per_inch: this.pixelsPerInch,
          })

          await TyreImpressionService.upload(res.data.id, this.tyreImpressionImage)

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