<template>
  <div>
    <!-- Step indicator -->
    <div class="flex items-center mb-2">
      <template v-for="(label, index) in stepLabels">
        <div
          :key="`step-${index}`"
          class="flex flex-col items-center"
        >
          <div
            :class="stepCircleClass(index)"
            class="w-6 h-6 rounded-full flex-center text-xs transition-200"
          >
            {{ index + 1 }}
          </div>
          <span
            :class="step === index ? 'text-primary' : 'text-gray'"
            class="text-xs mt-1 text-center w-20"
          >
            {{ label }}
          </span>
        </div>
        <div
          v-if="index < stepLabels.length - 1"
          :key="`connector-${index}`"
          :class="index < step ? 'bg-primary' : 'bg-gray-light'"
          class="flex-1 h-0.5 mb-2 transition-200"
        />
      </template>
    </div>

    <!-- Step 1: Image -->
    <div v-if="step === 0">
      <p class="text-sm text-gray mb-3">
        Select the tyre impression photograph to upload.
      </p>
      <validation-observer
        ref="imageObserver"
        v-slot="{ handleSubmit }"
      >
        <form @submit.prevent="handleSubmit(nextStep)">
          <validation-provider
            v-slot="validationContext"
            :rules="{ isImageFile, required: true }"
            name="Tyre Impression Image"
          >
            <file-input
              v-model="image"
              :invalid="!!validationContext.errors[0]"
              placeholder="Browse files"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>

          <div
            v-if="imagePreviewUrl"
            class="my-2 rounded-md overflow-hidden"
          >
            <img
              :src="imagePreviewUrl"
              alt="Preview"
              class="max-w-[75%] mx-auto object-contain"
            >
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <c-button
              :disabled="!image"
              class="max-w-1/8"
              type="submit"
              variant="primary"
            >
              Next
            </c-button>
          </div>
        </form>
      </validation-observer>
    </div>

    <!-- Step 2: Bounding Box -->
    <div v-if="step === 1">
      <p class="text-sm text-gray mb-1">
        Click the top-left corner of the tyre impression, then the bottom-right
        corner. The blue rectangle marks the region that will be used for processing.
      </p>
      <small class="text-gray mb-3 block">
        {{ roiPoints.length }}/2 corners selected
        <span v-if="roiPoints.length === 2"> — {{ roiWidthPx }}×{{ roiHeightPx }}px</span>
      </small>

      <reference-point-picker
        v-model="roiPoints"
        :src="imagePreviewUrl"
        class="mx-auto max-w-[75%]"
        mode="rect"
      />

      <div class="flex-between gap-2 mt-2">
        <c-button
          class="max-w-1/8"
          @click="step = 0"
        >
          Back
        </c-button>
        <div class="grow" />
        <c-button
          v-if="roiPoints.length"
          class="max-w-1/8"
          @click="roiPoints = []"
        >
          Reset
        </c-button>
        <c-button
          :disabled="roiPoints.length !== 2"
          class="max-w-1/8"
          variant="primary"
          @click="nextStep"
        >
          Next
        </c-button>
      </div>
    </div>

    <!-- Step 3: PPI Calibration -->
    <div v-if="step === 2">
      <p class="text-sm text-gray mb-1">
        Click two points on the scale ruler that correspond to a known real-world distance.
      </p>
      <small class="text-gray mb-3 block">
        {{ calibrationPoints.length }}/2 points selected
      </small>

      <reference-point-picker
        v-model="calibrationPoints"
        :src="imagePreviewUrl"
        class="max-w-[75%] mx-auto"
        mode="line"
      />

      <div
        v-if="calibrationPoints.length === 2"
        class="mt-2"
      >
        <label>Real-world distance between points</label>
        <distance-calibration-input
          v-model="pixelsPerInch"
          :pixel-distance="calibrationPixelDistance"
        />
      </div>

      <div class="flex-between gap-2 mt-2">
        <c-button
          class="max-w-1/8"
          @click="step = 0"
        >
          Back
        </c-button>
        <div class="grow" />
        <c-button
          v-if="calibrationPoints.length"
          class="max-w-1/8"
          @click="calibrationPoints = []"
        >
          Reset
        </c-button>
        <c-button
          :disabled="calibrationPoints.length !== 2"
          class="max-w-1/8"
          variant="primary"
          @click="nextStep"
        >
          Next
        </c-button>
      </div>
    </div>

    <!-- Step 4: Review & Submit -->
    <div v-if="step === 3">
      <p class="text-sm text-gray mb-4">
        Review the values below and submit when ready.
      </p>

      <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
        <dt class="font-medium">
          File
        </dt>
        <dd class="text-gray truncate">
          {{ image ? image.name : '—' }}
        </dd>

        <dt class="font-medium">
          ROI Top
        </dt>
        <dd class="text-gray">
          {{ roiTop }}px
        </dd>

        <dt class="font-medium">
          ROI Left
        </dt>
        <dd class="text-gray">
          {{ roiLeft }}px
        </dd>

        <dt class="font-medium">
          ROI Right
        </dt>
        <dd class="text-gray">
          {{ roiRight }}px
        </dd>

        <dt class="font-medium">
          ROI Bottom
        </dt>
        <dd class="text-gray">
          {{ roiBottom }}px
        </dd>

        <dt class="font-medium">
          Pixels per inch
        </dt>
        <dd class="text-gray">
          {{ pixelsPerInch.toFixed(3) }} px/in
        </dd>
      </dl>

      <div class="flex-between gap-2 mt-4">
        <c-button
          class="max-w-1/8"
          @click="step = 2"
        >
          Back
        </c-button>
        <c-button
          :disabled="loading"
          class="max-w-1/8"
          variant="primary"
          @click="submit"
        >
          {{ loading ? 'Uploading…' : 'Submit' }}
        </c-button>
      </div>
    </div>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService"
  import CButton from "@/components/ui/CustomButton.vue"
  import FileInput from "@/components/forms/FileInput.vue"
  import {isImageFile} from "@/@core/utils/validations/validations"
  import TyreImpressionService from "@/services/TyreImpressionService"
  import ReferencePointPicker from "@/components/image/ReferencePointPicker.vue"
  import DistanceCalibrationInput from "@/components/forms/DistanceCalibrationInput.vue"

  export default {
    name: "CreateTyreImpressionModal",
    components: {CButton, FileInput, ReferencePointPicker, DistanceCalibrationInput},

    data() {
      return {
        step: 0,
        stepLabels: ["Image", "Bounding Box", "Calibration", "Review"],
        loading: false,

        // Step 1
        image: null,
        imagePreviewUrl: null,

        // Step 2
        roiPoints: [],

        // Step 3
        calibrationPoints: [],
        pixelsPerInch: 0,
      }
    },

    computed: {
      isImageFile() {
        return isImageFile
      },

      // Step 2 derived values
      roiLeft() {
        if (this.roiPoints.length !== 2) return 0
        return Math.round(Math.min(this.roiPoints[0].x, this.roiPoints[1].x))
      },
      roiTop() {
        if (this.roiPoints.length !== 2) return 0
        return Math.round(Math.min(this.roiPoints[0].y, this.roiPoints[1].y))
      },
      roiRight() {
        if (this.roiPoints.length !== 2) return 0
        return Math.round(Math.max(this.roiPoints[0].x, this.roiPoints[1].x))
      },
      roiBottom() {
        if (this.roiPoints.length !== 2) return 0
        return Math.round(Math.max(this.roiPoints[0].y, this.roiPoints[1].y))
      },
      roiWidthPx() {
        return this.roiRight - this.roiLeft
      },
      roiHeightPx() {
        return this.roiBottom - this.roiTop
      },

      // Step 3 derived values
      calibrationPixelDistance() {
        if (this.calibrationPoints.length !== 2) return null
        const [a, b] = this.calibrationPoints
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
      },
      canAdvanceFromCalibration() {
        return this.calibrationPoints.length === 2
          && this.pixelsPerInch > 0
          && this.pixelsPerInch < Infinity
      },
    },

    watch: {
      image(newFile) {
        this.roiPoints = []
        this.calibrationPoints = []
        this.pixelsPerInch = 0

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
      stepCircleClass(index) {
        if (index < this.step) return "bg-primary text-white"
        if (index === this.step) return "bg-primary text-white ring-2 ring-primary ring-offset-2"
        return "bg-gray-light text-white"
      },

      nextStep() {
        this.step++
      },

      async submit() {
        this.loading = true
        try {
          const dto = {
            pixels_per_inch: this.pixelsPerInch,
            roi_top: this.roiTop,
            roi_left: this.roiLeft,
            roi_right: this.roiRight,
            roi_bottom: this.roiBottom,
          }

          const res = await TyreImpressionService.create(dto)

          if (this.image) {
            await TyreImpressionService.upload(res.data.id, this.image)
          }

          HelperService.successToast(this.$toast, "Tyre impression uploaded successfully")
          this.$emit("close")
        } catch (err) {
          const res = err.response
          let errorText = "Could not upload tyre impression, please try again"

          if (res && res.data.error) {
            errorText = res.data.error
          }

          HelperService.errorToast(this.$toast, err, errorText)
          this.$emit("close")
        } finally {
          this.loading = false
        }
      }
    },
  }
</script>

<style scoped>
</style>
