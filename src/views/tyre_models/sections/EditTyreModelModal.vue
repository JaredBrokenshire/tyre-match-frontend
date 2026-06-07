<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(updateTyreModel)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Manufacturer *</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Manufacturer"
          >
            <text-input
              v-model="updatedTyreModel.manufacturer"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter manufacturer"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Model Name *</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Model Name"
          >
            <text-input
              v-model="updatedTyreModel.model_name"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter model name"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4">
        <section class="mb-4 w-1/2">
          <label>Category *</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Category"
          >
            <dropdown
              v-model="updatedTyreModel.category"
              :invalid="!!validationContext.errors[0]"
              :options="categoryOptions"
              placeholder="Select category"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="mb-4 w-1/2">
          <label>Vehicle Type *</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Vehicle Type"
          >
            <dropdown
              v-model="updatedTyreModel.vehicle_type"
              :invalid="!!validationContext.errors[0]"
              :options="vehicleTypeOptions"
              placeholder="Select vehicle type"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Width (mm)</label>
          <validation-provider
            v-slot="validationContext"
            name="Width (mm)"
          >
            <number-input
              v-model="updatedTyreModel.width_mm"
              :invalid="!!validationContext.errors[0]"
              :min="0"
              placeholder="Enter width (mm)"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Aspect Ratio (%)</label>
          <validation-provider
            v-slot="validationContext"
            name="Aspect Ratio"
          >
            <number-input
              v-model="updatedTyreModel.aspect_ratio"
              :invalid="!!validationContext.errors[0]"
              :max="100"
              :min="0"
              placeholder="Enter aspect ratio"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Rim Diameter (in)</label>
          <validation-provider
            v-slot="validationContext"
            name="Rim Diameter (in)"
          >
            <number-input
              v-model="updatedTyreModel.rim_diameter_inches"
              :invalid="!!validationContext.errors[0]"
              :min="0"
              placeholder="Enter rim diameter (in)"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Groove Count</label>
          <validation-provider
            v-slot="validationContext"
            name="Groove Count"
          >
            <number-input
              v-model="updatedTyreModel.groove_count"
              :invalid="!!validationContext.errors[0]"
              :min="0"
              placeholder="Enter groove count"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Pattern Type</label>
          <validation-provider
            v-slot="validationContext"
            name="Pattern Type"
          >
            <dropdown
              v-model="updatedTyreModel.pattern_type"
              :invalid="!!validationContext.errors[0]"
              :options="patternTypeOptions"
              placeholder="Select pattern type"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <section class="mb-4">
        <label>Dataset Source</label>
        <validation-provider
          v-slot="validationContext"
          name="Dataset Source"
        >
          <text-input
            v-model="updatedTyreModel.dataset_source"
            :invalid="!!validationContext.errors[0]"
            :rows="3"
            placeholder="Enter dataset source"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
        </validation-provider>
      </section>

      <section class="mb-4">
        <label>Notes</label>
        <validation-provider
          v-slot="validationContext"
          name="Notes"
        >
          <text-input
            v-model="updatedTyreModel.notes"
            :invalid="!!validationContext.errors[0]"
            :rows="3"
            placeholder="Enter notes"
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
          Update
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import CButton from "@/components/ui/CustomButton.vue";
  import Dropdown from "@/components/forms/Dropdown.vue";
  import TextInput from "@/components/forms/TextInput.vue";
  import NumberInput from "@/components/forms/NumberInput.vue";

  export default {
    name: "EditTyreModelModal",
    components: {NumberInput, Dropdown, CButton, TextInput},
    props: {
      existing: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        loading: false,
        updatedTyreModel: {
          manufacturer: "",
          model_name: "",
          category: "",
          vehicle_type: "",
          width_mm: 0,
          aspect_ratio: 0,
          rim_diameter_inches: 0,
          groove_count: 0,
          pattern_type: "",
          dataset_source: "",
          notes: "",
        },
        categoryOptions: [
          {label: "All-Season", value: "All Season"},
          {label: "Summer", value: "Summer"},
          {label: "Winter", value: "Winter"},
          {label: "All-Terrain", value: "All-Terrain"},
          {label: "Touring", value: "Touring"},
          {label: "Performance", value: "Performance"},
          {label: "Run-Flat", value: "Run-Flat"},
        ],
        vehicleTypeOptions: [
          {label: "Passenger Car", value: "Passenger Car"},
          {label: "High Performance", value: "High Performance"},
          {label: "Electric Vehicle", value: "Electric Vehicle"},
          {label: "Light Truck", value: "Light Truck"},
          {label: "Commercial Truck", value: "Commercial Truck"},
          {label: "4x4", value: "4x4"},
          {label: "Motorcycle", value: "Motorcycle"},
        ],
        patternTypeOptions: [
          {label: "Symmetrical", value: "Symmetrical"},
          {label: "Asymmetrical", value: "Asymmetrical"},
          {label: "Directional", value: "Directional"},
        ],
      }
    },
    mounted() {
      this.updatedTyreModel = {...this.$props.existing};
    },
    methods: {
      async updateTyreModel() {
        this.$emit("update", this.updatedTyreModel);
      }
    }
  }
</script>

<style scoped>

</style>