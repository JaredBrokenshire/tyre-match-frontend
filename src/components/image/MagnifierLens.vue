<template>
  <div
    v-if="visible"
    :style="lensStyle"
    class="absolute rounded-full border border-primary shadow bg-no-repeat pointer-events-none overflow-hidden z-10"
  >
    <div
      v-for="marker in pointMarkers"
      :key="marker.index"
      :style="{ left: marker.x + 'px', top: marker.y + 'px' }"
      class="absolute w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-primary-light border border-white text-xs font-bold text-white flex-center"
    >
      {{ marker.index + 1 }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "MagnifierLens",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      imageSrc: {
        type: String,
        default: null,
      },
      x: {
        type: Number,
        default: 0,
      },
      y: {
        type: Number,
        default: 0,
      },
      containerWidth: {
        type: Number,
        default: 0,
      },
      containerHeight: {
        type: Number,
        default: 0,
      },
      size: {
        type: Number,
        default: 160,
      },
      zoom: {
        type: Number,
        default: 3,
      },
      // Markers to draw inside the lens, in the same coordinate space as x/y.
      points: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      lensStyle() {
        const bgWidth = this.containerWidth * this.zoom
        const bgHeight = this.containerHeight * this.zoom
        const bgPosX = this.size / 2 - this.x * this.zoom
        const bgPosY = this.size / 2 - this.y * this.zoom

        return {
          left: `${this.x - this.size / 2}px`,
          top: `${this.y - this.size / 2}px`,
          width: `${this.size}px`,
          height: `${this.size}px`,
          backgroundImage: `url(${this.imageSrc})`,
          backgroundSize: `${bgWidth}px ${bgHeight}px`,
          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
        }
      },
      pointMarkers() {
        return this.points.map((point, index) => ({
          index,
          x: this.size / 2 + (point.x - this.x) * this.zoom,
          y: this.size / 2 + (point.y - this.y) * this.zoom,
        }))
      },
    },
  }
</script>

<style scoped>
</style>