<template>
  <nav
    class="mx-5 md:mx-10 lg:mx-16 py-5 flex items-center justify-between lg:gap-16"
  >
    <RouterLink :to="{ name: 'home' }" class="w-16 shrink-0">
      <img
        src="@/assets/images/alephlogo.png"
        class="w-full"
        alt="aleph logo"
      />
    </RouterLink>

    <div class="w-full">
      <SearchBar />
    </div>

    <div></div>
  </nav>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
</script>

<style scoped></style>
