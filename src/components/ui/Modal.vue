<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex-center p-6 backdrop-blur-xs"
    >
      <div
        :class="maxWidth"
        aria-modal="true"
        class="bg-white rounded-2xl shadow-lg w-full p-6 relative"
        role="dialog"
      >
        <div class="flex-between flex-row-reverse w-full absolute top-0 left-0 px-6 py-3">
          <button
            v-if="showClose"
            class="transition-all px-2 aspect-square rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            @click="$emit('close')"
          >
            <span class="sr-only">Close</span>
            ✕
          </button>
          <div
            v-if="title"
            class="text-lg font-bold grow"
          >
            {{ title }}
          </div>
        </div>

        <div class="mt-8">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: "",
      },
      showClose: {
        type: Boolean,
        default: true,
      },
      size: {
        type: String,
        default: "md",
      }
    },
    computed: {
      maxWidth() {
        switch (this.size) {
        case "sm":
          return "max-w-full md:max-w-1/2 xl:max-w-1/4"
        case "md":
        default:
          return "max-w-full sm:max-w-2/3 xl:max-w-1/3"
        case "lg":
          return "max-w-full md:max-w-3/4 xl:max-w-1/2"
        case "xl":
          return "max-w-full"
        }
      }
    }
  };
</script>

<style scoped>
</style>
