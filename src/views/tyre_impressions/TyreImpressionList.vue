<template>
  <div>
    <card
      class="mb-4"
      title="Tyre Impressions"
    >
      <div class="flex-between gap-2">
        <div class="grow">
          This page shows all tyre impressions submitted for comparison.
        </div>
        <div class="w-fit">
          <c-button
            variant="primary"
            @click="showUploadTyreImpressionModal = true"
          >
            Upload Tyre Impression
          </c-button>
        </div>
      </div>
    </card>

    <card class="mb-4">
      <div class="flex flex-col md:flex-row justify-between md:items-end gap-2">
        <div class="w-fit">
          <c-button @click="clearFilters">Clear Filters</c-button>
        </div>
      </div>
    </card>

    <data-table
      :columns="columnHeaders"
      :current-page="currentPage"
      :data="tyreImpressions"
      :page-size="filters.page_size"
      :row-link="(row) => `/tyre-impression/${row.id}`"
      :total-count="totalCount"
      @change-page="getMoreTyreImpressions"
    >
      <template #status="{ row }">
        {{ row.status?.charAt(0).toUpperCase() + row.status?.slice(1) }}
      </template>
      <template #created_at="{ row }">
        {{
          row.created_at
            ? `${new Date(row.created_at).toLocaleTimeString("en-GB")} ${new Date(row.created_at).toLocaleDateString("en-GB")}`
            : ''
        }}
      </template>
      <template #updated_at="{ row }">
        {{
          row.updated_at
            ? `${new Date(row.updated_at).toLocaleTimeString("en-GB")} ${new Date(row.updated_at).toLocaleDateString("en-GB")}`
            : ''
        }}
      </template>
    </data-table>

    <modal
      id="modal-upload-tyre-impression"
      :visible="showUploadTyreImpressionModal"
      size="lg"
      title="Upload Tyre Impression"
      @close="closeModals"
    >
      <create-tyre-impression-modal @close="closeModals" />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import HelperService from "@/services/HelperService";
  import DataTable from "@/components/ui/DataTable.vue";
  import CButton from "@/components/ui/CustomButton.vue";
  import TyreImpressionService from "@/services/TyreImpressionService";
  import CreateTyreImpressionModal from "@/views/tyre_impressions/sections/CreateTyreImpressionModal.vue";

  export default {
    name: "TyreImpressionList",
    components: {CreateTyreImpressionModal, DataTable, Modal, Card, CButton},
    data() {
      return {
        loading: false,
        tyreImpressions: [],
        currentPage: 1,
        totalCount: 0,
        filters: {
          page: 0,
          page_size: 20,
        },
        showUploadTyreImpressionModal: false,
        columnHeaders: [
          {label: "ID", field: "id", width: "10%"},
          {label: "Status", field: "status", width: "30%"},
          {label: "Uploaded At", field: "created_at", width: "30%"},
          {label: "Updated At", field: "updated_at", width: "30%"},
        ],
      }
    },
    mounted() {
      this.getTyreImpressions()
    },
    methods: {
      getMoreTyreImpressions(page) {
        this.currentPage = page;
        this.filters.page = page - 1;
        this.getTyreImpressions()
      },
      async getTyreImpressions() {
        this.loading = true;
        try {
          const res = await TyreImpressionService.list(this.filters)
          this.tyreImpressions = res.data.data
          this.filters.page = res.data.meta.page
          this.filters.page_size = res.data.meta.page_size
          this.totalCount = res.data.meta.total_count
        } catch (err) {
          const res = err.response
          let errorText = "Could not get tyre impressions, please refresh and try again";

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
        }

        this.getMoreTyreImpressions(1)
      },
      closeModals() {
        this.showUploadTyreImpressionModal = false;

        this.clearFilters();
      },
    }
  }
</script>

<style scoped>

</style>