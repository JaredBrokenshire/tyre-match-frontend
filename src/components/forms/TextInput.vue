<template>
  <input
    v-if="rows === 1"
    :id="id"
    :class="invalid ? 'border-danger-light focus:ring-danger-light focus:border-danger-light' : 'border-gray-light focus:ring-primary focus:border-primary'"
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    :value="value"
    class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm"
    @input="$emit('input', $event.target.value)"
  >
  <textarea
    v-else
    :id="id"
    :class="invalid ? 'border-danger-light focus:ring-danger-light focus:border-danger-light' : 'border-gray-light focus:ring-primary focus:border-primary'"
    :disabled="disabled"
    :placeholder="placeholder"
    :rows="rows"
    :value="value"
    class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
  export default {
    name: "TextInput",
    props: {
      value: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: "text",
      },
      placeholder: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
      },
      rows: {
        type: Number,
        default: 1,
      },
      invalid: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
  };
</script>
