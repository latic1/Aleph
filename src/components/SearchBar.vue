<template>
  <div
    class="flex py-1 items-center rounded-full border px-2 lg:px-5 lg:divide-x-2 justify-between w-96"
  >
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold text-gray-600">Location</label>
      <input
        class="w-full border-0 focus:outline-none"
        placeholder="Search for destination"
        type="text"
      />
    </div>
    <div class="w-full flex flex-col items-center justify-center px-2">
      <label class="text-sm font-semibold text-gray-600">People</label>
      <input
        class="w-full px-2 focus:outline-none decoration-slice"
        placeholder="Add guest"
        type="number"
        min="1"
      />
    </div>
    <button
      class="bg-[#FFA800] shrink-0 rounded-full md:w-12 md:h-12 inline-flex items-center justify-center text-white hover:bg-[#ff9800] transition duration-300"
    >
      <IconSearch />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";
</script>

<style scoped>
/* You can add any custom styles here if needed */
</style>
