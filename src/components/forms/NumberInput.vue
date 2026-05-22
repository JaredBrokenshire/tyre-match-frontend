<template>
  <div class="flex-center gap-2 w-full">
    <button
      v-if="showButtons"
      :disabled="value <= min"
      class="step-button"
      type="button"
      @click="decrease"
    >
      -
    </button>
    <input
      :class="invalid ? 'border-danger-light focus:ring-danger-light focus:border-danger-light' : 'border-gray-light focus:ring-primary focus:border-primary'"
      :max="max"
      :min="min"
      :step="step"
      :value="displayValue"
      class="grow text-center px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2"
      inputmode="decimal"
      type="text"
      @input="onInput"
      @keydown="onKeyDown"
    >
    <button
      v-if="showButtons"
      :disabled="value >= max"
      class="step-button"
      type="button"
      @click="increase"
    >
      +
    </button>
  </div>
</template>

<script>
  export default {
    name: 'NumberInput',
    props: {
      value: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        default: -Infinity
      },
      max: {
        type: Number,
        default: Infinity
      },
      step: {
        type: Number,
        default: 1
      },
      invalid: {
        type: Boolean,
        default: false
      },
      showButtons: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        displayValue: String(this.$props.value),
      }
    },
    watch: {
      value(newValue) {
        this.displayValue = String(newValue)
      }
    },
    methods: {
      onInput(event) {
        let val = event.target.value;

        // Remove invalid characters
        val = val.replace(/[^0-9.-]/g, '');

        // Only one decimal point
        val = val.replace(/(\..*)\./g, '$1');

        // Only leading minus allowed
        val = val.replace(/(?!^)-/g, '');

        // Update displayed value immediately
        this.displayValue = val;

        // Allow temporary states like "-", ".", "-."
        if (
          val === '' ||
          val === '-' ||
          val === '.' ||
          val === '-.'
        ) {
          return;
        }

        const num = parseFloat(val);

        if (!isNaN(num)) {
          this.updateValue(num);
        }
      },
      onKeyDown(event) {
        const allowedKeys = [
          'Backspace',
          'Delete',
          'Tab',
          'Escape',
          'Enter',
          'ArrowLeft',
          'ArrowRight',
          'ArrowUp',
          'ArrowDown',
          'Home',
          'End'
        ];

        // Allow navigation/editing keys
        if (allowedKeys.includes(event.key)) {
          return;
        }

        // Allow Ctrl/Cmd shortcuts
        if (event.ctrlKey || event.metaKey) {
          return;
        }

        // Allow digits
        if (/^[0-9]$/.test(event.key)) {
          return;
        }

        // Allow one decimal point
        if (
          event.key === '.' &&
          !event.target.value.includes('.')
        ) {
          return;
        }

        // Allow leading minus
        if (
          this.$props.min < 0 &&
          event.key === '-' &&
          event.target.selectionStart === 0 &&
          !event.target.value.includes('-')
        ) {
          return;
        }

        // Block everything else
        event.preventDefault();
      },
      increase() {
        this.updateValue(this.value + this.step);
      },
      decrease() {
        this.updateValue(this.value - this.step);
      },
      updateValue(newVal) {
        const clamped = Math.min(this.max, Math.max(this.min, newVal));

        this.displayValue = String(clamped);

        this.$emit('input', clamped);
      }
    }
  };
</script>

<style scoped>
</style>
