<template>
  <div class="reference-point-picker">
    <div class="rpp-image-wrapper">
      <img
        ref="image"
        :src="src"
        alt="Reference image"
        class="rpp-image"
        @click="handleClick"
        @load="onImageLoad"
        @mouseleave="handleMouseLeave"
        @mousemove="handleMouseMove"
      >
      <svg
        v-if="displayWidth"
        :height="displayHeight"
        :width="displayWidth"
        class="rpp-overlay"
      >
        <line
          v-if="displayPoints.length === 2"
          :x1="displayPoints[0].x"
          :x2="displayPoints[1].x"
          :y1="displayPoints[0].y"
          :y2="displayPoints[1].y"
          class="rpp-line"
        />
        <g
          v-for="(point, index) in displayPoints"
          :key="index"
        >
          <circle
            :cx="point.x"
            :cy="point.y"
            class="rpp-point"
            r="7"
          />
          <text
            :x="point.x"
            :y="point.y"
            class="rpp-point-label"
          >
            {{ index + 1 }}
          </text>
        </g>
      </svg>

      <magnifier-lens
        :container-height="displayHeight"
        :container-width="displayWidth"
        :image-src="src"
        :points="displayPoints"
        :size="magnifierSize"
        :visible="magnifierEnabled && isHovering"
        :x="cursorPos.x"
        :y="cursorPos.y"
        :zoom="magnifierZoom"
      />
    </div>
  </div>
</template>

<script>
  import MagnifierLens from "./MagnifierLens.vue"

  export default {
    name: "ReferencePointPicker",
    components: {MagnifierLens},
    model: {
      prop: "points",
      event: "change",
    },
    props: {
      src: {
        type: String,
        default: null,
      },
      points: {
        type: Array,
        default: () => [],
      },
      maxPoints: {
        type: Number,
        default: 2,
      },
      magnifierEnabled: {
        type: Boolean,
        default: true,
      },
      magnifierSize: {
        type: Number,
        default: 160,
      },
      magnifierZoom: {
        type: Number,
        default: 3,
      },
    },
    data() {
      return {
        naturalWidth: 0,
        naturalHeight: 0,
        displayWidth: 0,
        displayHeight: 0,
        resizeObserver: null,
        isHovering: false,
        cursorPos: {x: 0, y: 0},
      }
    },
    computed: {
      displayPoints() {
        if (!this.naturalWidth || !this.naturalHeight || !this.displayWidth) return []

        const scaleX = this.displayWidth / this.naturalWidth
        const scaleY = this.displayHeight / this.naturalHeight

        return this.points.map(point => ({
          x: point.x * scaleX,
          y: point.y * scaleY,
        }))
      },
    },
    watch: {
      src() {
        this.naturalWidth = 0
        this.naturalHeight = 0
        this.displayWidth = 0
        this.displayHeight = 0
        this.isHovering = false
        this.$emit("change", [])
      },
    },
    beforeDestroy() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
      }
    },
    methods: {
      onImageLoad() {
        const img = this.$refs.image
        if (!img) return

        this.naturalWidth = img.naturalWidth
        this.naturalHeight = img.naturalHeight
        this.updateDisplayDimensions()

        if ("ResizeObserver" in window) {
          if (this.resizeObserver) {
            this.resizeObserver.disconnect()
          }
          this.resizeObserver = new ResizeObserver(() => this.updateDisplayDimensions())
          this.resizeObserver.observe(img)
        }
      },
      updateDisplayDimensions() {
        const img = this.$refs.image
        if (!img) return

        this.displayWidth = img.clientWidth
        this.displayHeight = img.clientHeight
      },
      handleClick(event) {
        const rect = this.$refs.image.getBoundingClientRect()

        const displayX = event.clientX - rect.left
        const displayY = event.clientY - rect.top

        const scaleX = this.naturalWidth / rect.width
        const scaleY = this.naturalHeight / rect.height

        const point = {
          x: displayX * scaleX,
          y: displayY * scaleY,
        }

        const points = this.points.length >= this.maxPoints
          ? [point]
          : [...this.points, point]

        this.$emit("change", points)
      },
      handleMouseMove(event) {
        const rect = this.$refs.image.getBoundingClientRect()

        this.cursorPos = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
        this.isHovering = true
      },
      handleMouseLeave() {
        this.isHovering = false
      },
    },
  }
</script>

<style scoped>
.rpp-image-wrapper {
  position: relative;
  display: inline-block;
  justify-content: center;
  max-width: 100%;
}

.rpp-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  cursor: crosshair;
  user-select: none;
  border: 1px solid #dee2e6;
}

.rpp-overlay {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.rpp-point {
  fill: #ff3b30;
  stroke: #fff;
  stroke-width: 2;
}

.rpp-point-label {
  fill: #fff;
  font-size: 11px;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;
  pointer-events: none;
}

.rpp-line {
  stroke: #ff3b30;
  stroke-width: 2;
  stroke-dasharray: 6 4;
}
</style>