<script setup lang="ts">
import "swiper/css";
import "swiper/css/pagination";
import PropertyCard from "./PropertyCard.vue";
import type { IProperties } from "@/types";

// Define the properties prop
defineProps<{
  properties: Array<IProperties>;
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <!-- Show properties if they exist -->
    <PropertyCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />
  </div>
  <!-- Skeleton loader if no properties are present -->
  <div
    v-if="properties.length === 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
  >
    <div
      v-for="item in [1, 2, 3, 4]"
      :key="item"
      class="py-4 rounded shadow-md w-60 sm:w-80 animate-pulse bg-gray-50"
    >
      <div class="flex p-4 space-x-4 sm:px-8">
        <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gray-300"></div>
        <div class="flex-1 py-2 space-y-4">
          <div class="w-full h-3 rounded bg-gray-300"></div>
          <div class="w-5/6 h-3 rounded bg-gray-300"></div>
        </div>
      </div>
      <div class="p-4 space-y-4 sm:px-8">
        <div class="w-full h-4 rounded bg-gray-300"></div>
        <div class="w-full h-4 rounded bg-gray-300"></div>
        <div class="w-3/4 h-4 rounded bg-gray-300"></div>
      </div>
    </div>
  </div>
</template>
