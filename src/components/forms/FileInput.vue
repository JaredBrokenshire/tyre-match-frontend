<template>
  <div>
    <input
      :class="invalid ? 'border-danger focus:ring-danger focus:border-danger' : 'border-gray-light focus:ring-primary focus:border-primary'"
      accept="image/*"
      class="text-gray px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm"
      type="file"
      @change="onFileChange"
    >
  </div>
</template>

<script>
  export default {
    name: 'FileInput',
    props: {
      value: File,
      placeholder: {
        type: String,
        default: 'Select file'
      },
      invalid: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        this.$emit('input', file);
      }
    }
  };
</script>
