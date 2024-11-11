<!-- <template>
  <div
    class="flex py-1 items-center rounded-full border px-2 lg:px-5 lg:divide-x-2 w-full justify-between"
  >
    <div class="">
      <p>Location</p>
      <input class="w-full" placeholder="Search for destination" type="text" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <p>Check in</p>
      <input class="w-full" placeholder="Add date" type="text" />
    </div>
    <div>
      <p>Check out</p>
      <input class="w-full" placeholder="Add date" type="text" />
    </div>
    <div class="pl-2">
      <p>People</p>
      <input class="w-full" placeholder="Add guest" type="text" />
    </div>
    <button
      class="bg-[#FFA800] rounded-full md:w-10 md:h-10 inline-flex items-center justify-center text-white"
    >
      <IconSearch />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";
</script>

<style scoped></style> -->

<template>
  <div
    class="flex py-1 items-center rounded-full border px-2 lg:px-5 lg:divide-x-2 w-full justify-between bg-white "
  >
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold text-gray-600">Location</label>
      <input
        class="w-full border-0  focus:outline-none"
        placeholder="Search for destination"
        type="text"
      />
    </div>
    <div class="flex flex-col items-center justify-center px-2">
      <label class="text-sm font-semibold text-gray-600">Check in</label>
      <input
        class="w-full px-2 focus:outline-none"
        placeholder="Add date"
        type="date"
      />
    </div>
    <div class="flex flex-col items-center justify-center px-2">
      <label class="text-sm font-semibold text-gray-600">Check out</label>
      <input
        class="w-full px-2 focus:outline-none"
        placeholder="Add date"
        type="date"
      />
    </div>
    <div class="w-full flex flex-col items-center justify-center px-2">
      <label class="text-sm font-semibold text-gray-600">People</label>
      <input
        class="w-full  px-2 focus:outline-none decoration-slice"
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
