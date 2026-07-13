<template>
  <div>
    <div class="w-1/2 flex gap-2">
      <div class="grow">
        <number-input
          v-model="realWorldDistance"
          :invalid="!!displayedError"
          :min="0"
          :show-buttons="false"
          @focusout.native="inputTouched = true"
        />
      </div>
      <div class="w-24 shrink-0">
        <dropdown
          v-model="selectedUnit"
          :options="units"
          placeholder="Unit"
        />
      </div>
    </div>
    <small class="text-danger">{{ displayedError }}</small>
    <small
      v-if="$props.pixelDistance"
      class="text-gray text-sm block mt-1"
    >
      Measured {{ $props.pixelDistance.toFixed(2) }}px{{ scaleSummary ? ` ${scaleSummary}` : '' }}
    </small>
  </div>
</template>

<script>
  import debounce from "lodash/debounce";
  import Dropdown from "@/components/forms/Dropdown.vue"
  import NumberInput from "@/components/forms/NumberInput.vue"

  export default {
    name: "DistanceCalibrationInput",
    components: {NumberInput, Dropdown},
    props: {
      value: {
        type: Number,
        default: 0,
      },
      pixelDistance: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        inputTouched: false,
        realWorldDistance: 0,
        units: [
          {label: "mm", value: "mm"},
          {label: "in", value: "in"},
        ],
        selectedUnit: "mm",
      }
    },
    computed: {
      errorMessage() {
        return this.realWorldDistance > 0 ? null : "Enter a distance greater than 0"
      },
      displayedError() {
        return this.inputTouched ? this.errorMessage : null
      },
      scaleSummary() {
        if (!this.pixelDistance || !this.realWorldDistance || this.realWorldDistance <= 0) return null

        return `≈ ${this.calculatePixelsPerInch().toFixed(2)} px/in`
      },
    },
    mounted() {
      this.debouncedInput = debounce(this.calculatePixelsPerInch, 500)
    },
    methods: {
      calculatePixelsPerInch() {
        if (this.realWorldDistance === 0) {
          return null
        }

        let distance = this.realWorldDistance

        if (this.selectedUnit === "mm") {
          distance = distance / 25.4
        }

        const pixelsPerInch = this.pixelDistance / distance

        this.$emit('input', pixelsPerInch)
        return pixelsPerInch
      },
    }
  }
</script>