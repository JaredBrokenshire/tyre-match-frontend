<template>
  <div
    class="w-full px-16 py-2 flex-between"
    style="z-index: 10;"
  >
    <div class="flex items-center gap-4 text-lg">
      <router-link
        :to="{name: 'home'}"
        class="hidden sm:block sm:mr-4"
      >
        <img
          :src="websiteLogo"
          alt="Website Logo"
          class="w-37.5 aspect-square"
        >
      </router-link>
      <router-link
        :class="`nav-link md:mx-4 ${activeLink === 'home' && 'active'}`"
        :to="{name: 'home'}"
      >
        <h5>Home</h5>
      </router-link>
      <router-link
        :class="`nav-link md:mx-4 ${activeLink === 'tyre-models' && 'active'}`"
        :to="{name: 'tyre-models'}"
      >
        <h5>Tyre Models</h5>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageHeader",
    data() {
      return {
        websiteLogo: require('@/assets/images/website-logo.png'),
      }
    },
    computed: {
      activeLink() {
        return this.$route.name
      }
    },
  }
</script>

<style scoped>
</style>