<template>
  <div class="hero">
    <div class="hero__text-container">
      <h1 class="hero__title">
        Automated Vehicle Tyre Identification Using Computer Vision
      </h1>

      <h5 class="sm:mt-10 mt-4">
        This MSc Forensic Investigation project explores the development of a computer vision-based system for the
        identification and classification of vehicle tyres from digital imagery. The aim is to investigate how image
        processing and machine learning techniques can support forensic analysis by improving the accuracy, consistency,
        and speed of tyre recognition in investigative contexts.
        <br>
        <br>
        The tool is designed to assist forensic practitioners in comparing tyre patterns, identifying potential matches,
        and enhancing evidential interpretation through automated visual analysis.
      </h5>

    </div>
    <div class="hero__image-container">
      <div class="hero__image">
        <img
          :src="heroImage"
          alt="hero"
          class="object-contain"
        >
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: "Home",
    data() {
      return {
        heroImage: require("@/assets/images/pages/home/hero.png")
      }
    },
  }
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
}

.hero__text-container {
  width: 100%;
  flex: 1;
}

.hero__image-container {
  width: 100%;
}

.hero__image {
  position: relative;
  height: 300px;
  z-index: 0;
  object-fit: cover;
}

.hero__image img {
  height: 100%;
  width: 100%;
  align-self: end;
  object-fit: contain;
}

/* sm Breakpoint */
@media (min-width: 576px) {
  .hero__title {
    font-size: 48px;
  }
}

/* md Breakpoint */
@media (min-width: 768px) {
  .hero {
    flex-direction: row;
  }

  .hero__image-container {
    width: 50%;
    aspect-ratio: 1;
    margin-top: -8rem;
  }

  .hero__image {
    height: 600px;
  }
}
</style>