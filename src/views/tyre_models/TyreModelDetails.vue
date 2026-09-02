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

    <div v-if="tyreModel && !loading">
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
              variant="primary"
              @click="showUploadImageModal = true"
            >
              Upload Image
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
        v-if="tyreModel.images"
        class="mb-4 whitespace-pre-wrap"
        title="Images"
      >
        <div class="grid-3 mb-4 lg:mb-8">
          <image-display
            v-for="image in images"
            :key="`tyre-model-image-${image.file_type}`"
            :file="image"
            :show-title="true"
          />
        </div>
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
      id="modal-upload-tyre-model-image"
      :visible="showUploadImageModal"
      size="sm"
      title="Upload Tyre Model Image"
      @close="closeModals"
    >
      <upload-tyre-model-image-modal
        :tyre-model="tyreModel"
        @close="closeModals"
        @upload="uploadImage"
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
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  import ImageDisplay from "@/components/ui/ImageDisplay.vue";
  import EditTyreModelModal from "@/views/tyre_models/sections/EditTyreModelModal.vue";
  import UploadTyreModelImageModal from "@/views/tyre_models/sections/UploadTyreModelImageModal.vue";

  export default {
    name: "TyreModelDetails",
    components: {UploadTyreModelImageModal, ImageDisplay, DeleteModal, EditTyreModelModal, Modal, CButton, Card},
    data() {
      return {
        tyreModel: null,
        images: [],
        fileOrder: [
          "original",
          "normalised",
          "enhanced",
          'binary',
          'clean',
        ],
        loading: false,
        showUpdateModal: false,
        showUploadImageModal: false,
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

          if (this.tyreModel.images) {
            this.images = this.fileOrder
              .filter(type => this.tyreModel.images[type])
              .map(type => this.tyreModel.images[type]);
          }
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
      async uploadImage(image) {
        this.loading = true
        try {
          const res = await TyreModelService.uploadImage(this.tyreModel.id, image)
          this.tyreModel = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not upload tyre model image, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
          this.closeModals()
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
        this.showUploadImageModal = false;
        this.showDeleteModal = false;
      },
    }
  }
</script>

<style scoped>

</style>