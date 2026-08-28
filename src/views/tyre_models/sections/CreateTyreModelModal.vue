<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(createTyreModel)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Manufacturer *</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Manufacturer"
          >
            <text-input
              v-model="newTyreModel.manufacturer"
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
              v-model="newTyreModel.model_name"
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
              v-model="newTyreModel.category"
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
              v-model="newTyreModel.vehicle_type"
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
              v-model="newTyreModel.width_mm"
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
              v-model="newTyreModel.aspect_ratio"
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
              v-model="newTyreModel.rim_diameter_inches"
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
              v-model="newTyreModel.groove_count"
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
              v-model="newTyreModel.pattern_type"
              :invalid="!!validationContext.errors[0]"
              :options="patternTypeOptions"
              placeholder="Select pattern type"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>


      </div>

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
          Create
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Dropdown from "@/components/forms/Dropdown.vue";
  import TextInput from "@/components/forms/TextInput.vue";
  import TyreModelService from "@/services/TyreModelService";
  import NumberInput from "@/components/forms/NumberInput.vue";
  import {isImageFile} from "@/@core/utils/validations/validations";

  export default {
    name: "CreateTyreModelModal",
    components: {NumberInput, Dropdown, CButton, TextInput},
    data() {
      return {
        loading: false,
        newTyreModel: {
          manufacturer: "",
          model_name: "",
          category: "",
          vehicle_type: "",
          width_mm: 0,
          aspect_ratio: 0,
          rim_diameter_inches: 0,
          groove_count: 0,
          pattern_type: "",
        },
        image: null,
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
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      async createTyreModel() {
        this.loading = true;
        try {
          const dto = {...this.newTyreModel};

          const res = await TyreModelService.create(dto)

          if (this.image) {
            await TyreModelService.uploadImage(res.data.id, this.image)
          }

          HelperService.successToast(this.$toast, "Tyre Model created successfully")
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create tyre model, please refresh and try again";

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