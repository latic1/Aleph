<script setup lang="ts">
import "swiper/css";
import "swiper/css/pagination";
import PropertyCard from "./PropertyCard.vue";
import type { PropertiesProp } from "@/types";


defineProps<{
  properties: Array<PropertiesProp>;
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <PropertyCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />
  </div>
</template>
