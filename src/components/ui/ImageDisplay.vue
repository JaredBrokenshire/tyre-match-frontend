<template>
  <div
    v-if="!loading && imageURL"
    class="flex flex-col flex-center gap-4 lg:gap-8"
  >
    <h6 v-if="$props.showTitle">{{ file.file_type.toUpperCase() }}</h6>
    <img
      :class="`${!$props.showTitle && 'mt-8'}`"
      :src="imageURL"
      alt=""
    >
  </div>
</template>

<script>
  import FileService from "@/services/FileService";
  import HelperService from "@/services/HelperService";

  export default {
    name: "ImageDisplay",
    props: {
      file: {
        type: Object,
        required: true
      },
      showTitle: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imageURL: null,
        loading: false,
      }
    },
    mounted() {
      this.getImage()
    },
    methods: {
      async getImage() {
        this.loading = true
        try {
          const res = await FileService.get(`${this.$props.file.location}/${this.$props.file.name}`);
          this.imageURL = URL.createObjectURL(res.data);
        } catch (err) {
          const res = err.response;
          let errorText = `Could not get tyre impression image (${this.$props.file.file_type}), please refresh and try again`;

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