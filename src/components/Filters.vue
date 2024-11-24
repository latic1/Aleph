<template>
  <div>
    <!-- Desktop View -->
    <div class="hidden lg:flex items-center justify-end">
      <div class="space-x-4 flex">
        <!-- Price Sorting Dropdown -->
        <div
          class="py-2 px-4 rounded-full border inline-flex items-center w-full"
        >
          <p class="text-gray-400">Sort by:</p>
          <div class="flex items-center">
            <select
              id="sort"
              name="sort"
              class="h-full border-0 bg-transparent bg-none"
              v-model="selectedSort"
              @change="selectSortValue(selectedSort)"
            >
              <option value="highest">Highest Price</option>
              <option value="lowest">Lowest Price</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet and Mobile View -->
    <div v-if="isTablet">
      <div class="flex items-center justify-between">
        <div class="space-x-4 flex items-center">
          <!-- Show first 3 filters on tablet -->
          <button
            v-for="(filter, index) in filters.slice(0, 3)"
            :key="index"
            @click="selectFilter(filter)"
            class="py-1 px-2 rounded-full border"
          >
            {{ filter }}
          </button>

          <!-- Dropdown for additional filters -->
          <button
            class="p-2 rounded-full border inline-flex items-center lg:hidden"
            @click="toggleFilters"
          >
            <ChevronDownIcon class="w-4 h-4" />
          </button>

          <div v-if="showMoreFilters" class="flex flex-col space-y-2 z-50">
            <button
              v-for="(filter, index) in filters.slice(3)"
              :key="index"
              @click="selectFilter(filter)"
              class="py-2 border"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <div class="space-x-4 flex">
          <button
            class="py-1 px-2 rounded-full border inline-flex items-center"
          >
            Filter <FunnelIcon class="ml-2 w-4 h-4" />
          </button>

          <!-- Sorting Dropdown for Tablet View -->
          <div
            class="py-1 px-2 rounded-full border inline-flex items-center w-full"
          >
            <p class="pr-5 text-gray-400">Sort by:</p>
            <div class="flex items-center">
              <select
                id="sort"
                name="sort"
                class="h-full border-0 bg-transparent bg-none outline-none"
                v-model="selectedSort"
              >
                <option value="highest">Highest Price</option>
                <option value="lowest">Lowest Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  filters: string[];
  selectedFilter: string;
  selectSortValue: (sortValue: string) => void;
  selectFilter: (filter: string) => void;
  properties: any[];
}>();

const showMoreFilters = ref(false);
const selectedSort = ref("highest");

watchEffect(() => {
  console.log("sortrrrr::", selectedSort.value);
});

const toggleFilters = () => {
  showMoreFilters.value = !showMoreFilters.value;
};

// Track if the view is Tablet size
const isTablet = computed(
  () => window.innerWidth >= 768 && window.innerWidth < 1024
);
</script>

<style scoped>
/* Add any styles specific to the Filters component here */
</style>
