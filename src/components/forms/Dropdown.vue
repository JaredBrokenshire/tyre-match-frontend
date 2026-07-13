<template>
  <div class="relative inline-block w-full max-h-9">
    <div
      class="cursor-pointer border border-gray-light rounded-md px-3 py-2 flex justify-between items-center shadow-sm transition-all"
      @click="toggle"
    >
      <div
        :class="`${selectedLabel ? 'text-black text-sm' : 'text-gray text-sm'}`"
        class="truncate"
      >
        {{ selectedLabel || placeholder }}
      </div>
      <feather-icon icon="ChevronDownIcon" />
    </div>
    <transition
      v-if="open"
      name="fade"
    >
      <ul
        class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="option in options"
          :key="option.value"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="select(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: {
      placeholder: {
        type: String,
        default: 'Select...'
      },
      value: {
        type: [String, Number, Object, null],
        default: "",
      },
      options: {
        type: Array,
        default: () => []
      },
      invalid: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        open: false
      };
    },
    computed: {
      selectedLabel() {
        const selected = this.options.find(opt => opt.value === this.value);
        return selected ? selected.label : null;
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
      toggle() {
        this.open = !this.open;
      },
      select(option) {
        this.$emit('input', option.value);
        this.open = false;
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.open = false;
        }
      }
    }
  };
</script>
