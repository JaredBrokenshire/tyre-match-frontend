<template>
  <div>
    <router-link
      :to="{name: 'tyre-impression-list'}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Tyre Impressions
    </router-link>

    <div v-if="tyreImpression">
      <div class="flex flex-col lg:flex-row-reverse gap-4">
        <div class="grow lg:w-1/4">
          <card
            class="flex flex-col gap-4"
            title="Actions"
          >
            <c-button
              :disabled="true"
              variant="danger"
              @click="showDeleteModal = true"
            >
              Delete
            </c-button>
          </card>
        </div>
        <card
          :title="`Tyre Impression Details`"
          class="mb-4 grow lg:w-3/4"
        >
          <div class="py-4 flex-between gap-4">
            <div class="grow self-start">
              <div class="text-sm sm:text-lg">
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">UUID:</div>
                  <div>{{ tyreImpression.uuid }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold grow md:max-w-1/3 lg:max-w-1/4">Status:</div>
                  <div>{{ tyreImpression.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>

      <card
        v-if="tyreImpression.files"
        class="mb-4 whitespace-pre-wrap"
        title="Files"
      >
        <div class="grid-3 mb-4 lg:mb-8">
          <image-display
            v-for="file in files"
            :key="`tyre-impression-image-${file.file_type}`"
            :file="file"
            :show-title="true"
          />
        </div>
      </card>
    </div>

    <modal
      id="modal-delete-tyre-impression"
      :show-close="false"
      :visible="showDeleteModal"
      size="sm"
      title="Delete Tyre Impression"
    >
      <delete-modal
        type="tyre impression"
        @close="closeModals"
        @delete="deleteTyreImpression"
      />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  import TyreImpressionService from "@/services/TyreImpressionService";
  import ImageDisplay from "@/components/ui/ImageDisplay.vue";

  export default {
    name: "TyreModelDetails",
    components: {ImageDisplay, DeleteModal, Modal, CButton, Card},
    data() {
      return {
        tyreImpression: null,
        files: [],
        fileOrder: [
          "original",
          "normalised",
          "enhanced",
        ],
        loading: false,
        showDeleteModal: false,
      }
    },
    mounted() {
      this.getTyreImpression()
    },
    methods: {
      async getTyreImpression() {
        this.loading = true;
        try {
          const res = await TyreImpressionService.get(this.$route.params.id);
          this.tyreImpression = res.data;

          if (this.tyreImpression.files) {
            this.files = this.fileOrder
              .filter(type => this.tyreImpression.files[type])
              .map(type => this.tyreImpression.files[type]);
          }
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get tyre impression, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async deleteTyreImpression() {
        this.loading = true;
        try {
          await TyreImpressionService.delete(this.tyreImpression.id);

          HelperService.successToast(this.$toast, "Tyre impression deleted successfully")
          await this.$router.push({name: "tyre-impression-list"})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not delete tyre impression, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      closeModals() {
        this.showDeleteModal = false;
      },
    }
  }
</script>

<style scoped>

</style>