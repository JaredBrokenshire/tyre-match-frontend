<template>
  <div>
    <router-link
      :to="{name: 'tyre-model-list'}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Tyre Models
    </router-link>

    <div v-if="tyreModel">
      <div class="flex flex-col lg:flex-row-reverse gap-4">
        <div class="grow lg:w-1/4">
          <card
            class="flex flex-col gap-4"
            title="Actions"
          >
            <c-button
              :disabled="loading"
              variant="primary"
              @click="showUpdateModal = true"
            >
              Update
            </c-button>
            <c-button
              :disabled="loading"
              variant="danger"
              @click="showDeleteModal = true"
            >
              Delete
            </c-button>
          </card>
        </div>
        <card
          :title="`${tyreModel.manufacturer} ${tyreModel.model_name} Details`"
          class="mb-4 grow lg:w-3/4"
        >
          <div class="py-4 flex-between gap-4">
            <div class="grow self-start">
              <div class="text-sm sm:text-lg">
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Manufacturer:</div>
                  <div>{{ tyreModel.manufacturer }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Model Name:</div>
                  <div>{{ tyreModel.model_name }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Category:</div>
                  <div>{{ tyreModel.category }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Vehicle Type:</div>
                  <div>{{ tyreModel.vehicle_type }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Width:</div>
                  <div>{{ tyreModel.width_mm }} mm</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Aspect Ratio:</div>
                  <div>{{ tyreModel.aspect_ratio }}%</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Rim Diameter:</div>
                  <div>{{ tyreModel.rim_diameter_inches }} in.</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Groove Count:</div>
                  <div>{{ tyreModel.groove_count }}</div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>

      <card
        v-if="tyreModel.dataset_source !== ''"
        class="mb-4 whitespace-pre-wrap"
        title="Dataset Source"
      >
        <div>{{ tyreModel.dataset_source }}</div>
      </card>

      <card
        v-if="tyreModel.notes !== ''"
        class="mb-4 whitespace-pre-wrap"
        title="Notes"
      >
        <div>{{ tyreModel.notes }}</div>
      </card>
    </div>

    <modal
      id="modal-update-tyre-model"
      :visible="showUpdateModal"
      size="md"
      title="Update Tyre Model"
      @close="closeModals"
    >
      <edit-tyre-model-modal
        :existing="tyreModel"
        @close="closeModals"
        @update="updateTyreModel"
      />
    </modal>

    <modal
      id="modal-delete-tyre-model"
      :show-close="false"
      :visible="showDeleteModal"
      size="sm"
      title="Delete Tyre Model"
    >
      <delete-modal
        type="tyre model"
        @close="closeModals"
        @delete="deleteTyreModel"
      />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import TyreModelService from "@/services/TyreModelService";
  import EditTyreModelModal from "@/views/tyre_models/sections/EditTyreModelModal.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";

  export default {
    name: "TyreModelDetails",
    components: {DeleteModal, EditTyreModelModal, Modal, CButton, Card},
    data() {
      return {
        tyreModel: null,
        loading: false,
        showUpdateModal: false,
        showDeleteModal: false,
      }
    },
    mounted() {
      this.getTyreModel()
    },
    methods: {
      async getTyreModel() {
        this.loading = true;
        try {
          const res = await TyreModelService.get(this.$route.params.id);
          this.tyreModel = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get tyre model, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async updateTyreModel(updatedTyreModel) {
        this.loading = true;
        try {
          const dto = {...updatedTyreModel};

          const res = await TyreModelService.update(this.tyreModel.id, dto)
          this.tyreModel = res.data;

          HelperService.successToast(this.$toast, "Tyre model updated successfully")
          this.closeModals()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update tyre model, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async deleteTyreModel() {
        this.loading = true;
        try {
          await TyreModelService.delete(this.tyreModel.id);

          HelperService.successToast(this.$toast, "Tyre model deleted successfully")
          await this.$router.push({name: "tyre-model-list"})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not delete tyre model, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      closeModals() {
        this.showUpdateModal = false;
        this.showDeleteModal = false;
      },
    }
  }
</script>

<style scoped>

</style>