<template>
  <div
    class="flex py-1 items-center rounded-full border px-2 lg:px-5 lg:divide-x-2 justify-between w-full space-x-2"
  >
    <!-- Query Input -->
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold">Query</label>
      <input
        v-model="query"
        class="w-full border-0 focus:outline-none bg-transparent bg-none text-xs"
        placeholder="Search keyword"
        type="text"
      />
    </div>

    <!-- Location Input -->
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold">Location</label>
      <input
        v-model="location"
        class="w-full border-0 focus:outline-none bg-transparent bg-none text-xs"
        placeholder="Search for location"
        type="text"
      />
    </div>

    <!-- Type Dropdown -->
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold">Type</label>
      <select v-model="type" class="w-full border-0 focus:outline-none bg-transparent bg-none text-xs">
        <option value="" disabled selected>Select type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="land">Land</option>
      </select>
    </div>

    <!-- Price Min Input -->
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold">Min Price</label>
      <input
        v-model="price_min"
        class="w-full border-0 focus:outline-none bg-transparent bg-none text-xs"
        placeholder="Min price"
        type="number"
        min="0"
      />
    </div>

    <!-- Price Max Input -->
    <div class="flex flex-col w-full px-2">
      <label class="text-sm font-semibold">Max Price</label>
      <input
        v-model="price_max"
        class="w-full border-0 focus:outline-none bg-transparent bg-none text-xs"
        placeholder="Max price"
        type="number"
        min="0"
      />
    </div>

    <!-- Search Button -->
    <button
      @click="handleSearch"
      class="bg-[#FFA800] shrink-0 rounded-full md:w-12 md:h-12 inline-flex items-center justify-center text-white hover:bg-[#ff9800] transition duration-300"
    >
      <IconSearch />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconSearch from "./icons/IconSearch.vue";
import { usePropertiesStore } from "@/stores/properties";

// State variables for inputs
const query = ref("");
const location = ref("");
const type = ref("");
const price_min = ref<number | null>(null);
const price_max = ref<number | null>(null);

// Access the store
const propertiesStore = usePropertiesStore();

// Handle search logic
const handleSearch = () => {
  // Build filters object
  const filters = {
    query: query.value || undefined,
    location: location.value || undefined,
    type: type.value || undefined,
    price_min: price_min.value || undefined,
    price_max: price_max.value || undefined,
  };

  // Call the store action to fetch properties with filters
  propertiesStore.getProperties(filters);

  // Log or handle additional actions if necessary
  console.log("Search initiated with filters:", filters);
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
