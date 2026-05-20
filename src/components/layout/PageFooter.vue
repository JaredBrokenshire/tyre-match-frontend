<template>
  <footer class="flex flex-col mt-5 border-t border-gray-300">
    <div class="flex flex-col md:flex-row flex-wrap justify-between gap-5 p-5 sm:px-16">
      <div class="flex flex-col gap-5">
        <router-link :to="{name: 'home'}">
          <img
            :src="websiteLogo"
            alt="TyreMatch"
            class="w-25 aspect-square object-contain mx-auto"
          >
        </router-link>
        <p class="text-center">
          TyreMatch 2026 <br>
          All Rights Reserved &copy;
        </p>
      </div>

      <div class="flex flex-1 md:justify-end w-100 flex-wrap gap-20 mt-10">
        <div
          v-for="group in linkGroups"
          :key="group.title"
          class="flex flex-col gap-3 min-w-42.5"
        >
          <div class="text-lg font-bold">{{ group.title }}</div>
          <div class="flex flex-col gap-4">
            <a
              v-for="link in group.links"
              :key="link.title"
              :href="link.url"
              class="nav-link"
            >
              {{ link.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "PageFooter",
    data() {
      return {
        websiteLogo: require("@/assets/images/website-logo.png"),
        linkGroups: [
          {
            title: "About",
            links: [
              {title: "Vue Portal", url: "https://github.com/JaredBrokenshire/tyre-match-frontend"},
              {title: "Flask API", url: "https://github.com/JaredBrokenshire/tyre-match-backend"},
            ]
          },
          {
            title: "Socials",
            links: [
              {title: "GitHub", url: "https://github.com/JaredBrokenshire"},
              {title: "Instagram", url: "https://www.instagram.com/jbrokenshire0/"},
              {title: "LinkedIn", url: "https://www.linkedin.com/in/jared-brokenshire-771448227/"},
            ],
          },
        ]
      }
    }
  }
</script>

<style scoped>
</style>