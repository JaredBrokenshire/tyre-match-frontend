<template>
  <div>
    <card
      class="mb-4"
      title="Tyre Models"
    >
      <div class="flex-between gap-2">
        <div class="grow">
          This page shows all tyre models available for comparison.
        </div>
        <div class="w-fit">
          <c-button
            variant="primary"
            @click="showCreateTyreModelModal = true"
          >
            Create Tyre Model
          </c-button>
        </div>
      </div>
    </card>

    <card class="mb-4">
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-2">
        <div class="grow md:max-w-1/2 xl:max-w-1/3">
          <label for="tyre-models-search">Search</label>
          <text-input
            id="tyre-models-search"
            v-model="filters.search"
            placeholder="Search by model name or manufacturer"
            @input="onSearchInput"
          />
        </div>

        <div class="w-fit">
          <c-button @click="clearFilters">Clear Filters</c-button>
        </div>
      </div>
    </card>

    <data-table
      :columns="columnHeaders"
      :current-page="currentPage"
      :data="tyreModels"
      :page-size="filters.page_size"
      :row-link="(row) => `/tyre-model/${row.id}`"
      :total-count="totalCount"
      @change-page="getMoreTyreModels"
    />

    <modal
      id="modal-create-tyre-model"
      :visible="showCreateTyreModelModal"
      size="md"
      title="Create Tyre Model"
      @close="closeModals"
    >
      <create-tyre-model-modal @close="closeModals" />
    </modal>
  </div>
</template>

<script>
  import debounce from "lodash/debounce"
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import HelperService from "@/services/HelperService";
  import DataTable from "@/components/ui/DataTable.vue";
  import CButton from "@/components/ui/CustomButton.vue";
  import TextInput from "@/components/forms/TextInput.vue";
  import TyreModelService from "@/services/TyreModelService";
  import CreateTyreModelModal from "@/views/tyre_models/sections/CreateTyreModelModal.vue";

  export default {
    name: "TyreModelList",
    components: {CreateTyreModelModal, DataTable, TextInput, Modal, Card, CButton},
    data() {
      return {
        loading: false,
        tyreModels: [],
        currentPage: 1,
        totalCount: 0,
        filters: {
          page: 0,
          page_size: 20,
          search: "",
        },
        showCreateTyreModelModal: false,
        columnHeaders: [
          {label: "ID", field: "id", width: "5%"},
          {label: "Manufacturer", field: "manufacturer", width: "20%"},
          {label: "Model Name", field: "model_name", width: "20%"},
          {label: "Category", field: "category", width: "20%"},
          {label: "Vehicle Type", field: "vehicle_type", width: "20%"},
        ],
        debouncedSearch: null,
      }
    },
    mounted() {
      this.debouncedSearch = debounce(this.getMoreTyreModels, 500);
      this.getTyreModels()
    },
    methods: {
      getMoreTyreModels(page) {
        this.currentPage = page;
        this.filters.page = page - 1;
        this.getTyreModels()
      },
      async getTyreModels() {
        this.loading = true;
        try {
          const res = await TyreModelService.list(this.filters)
          this.tyreModels = res.data.data
          this.filters.page = res.data.meta.page
          this.filters.page_size = res.data.meta.page_size
          this.totalCount = res.data.meta.total_count
        } catch (err) {
          const res = err.response
          let errorText = "Could not get tyre models, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      clearFilters() {
        this.filters = {
          page: 1,
          page_size: 20,
          search: "",
        }

        this.getMoreTyreModels(1)
      },
      closeModals() {
        this.showCreateTyreModelModal = false;

        this.clearFilters()
      },
      onSearchInput() {
        this.filters.page = 1
        this.debouncedSearch(1)
      }
    }
  }
</script>

<style scoped>

</style>