<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="property">
    <div class="w-full flex items-center justify-between">
      <div class="w-full">
        <h1 class="font-bold sm:text-3xl lg:text-5xl">{{ property.name }}</h1>
        <div class="flex gap-2 lg:gap-5 mt-2">
          <div>
            <p class="flex items-center font-light">
              <span><MapPinIcon class="w-5 h-5" /></span>
              <span class="text-gray-400">{{ property.location }}</span>
            </p>
          </div>
          <div>
            <p class="flex items-center font-light">
              <span><UserCircleIcon class="w-5 h-5" /></span>
              <span class="text-gray-400">Mainstream</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex gap-2 lg:gap-5">
        <button
          class="py-1 lg:py-2 px-2 lg:px-4 border border-slate-400 rounded-full inline-flex items-center gap-2"
        >
          <HeartIcon class="w-4 h-4" /> Save
        </button>
        <button
          class="py-1 lg:py-2 px-2 lg:px-4 border border-slate-400 rounded-full inline-flex items-center gap-2"
        >
          <ArrowUpTrayIcon class="w-4 h-4" /> Share
        </button>
      </div>
    </div>

    <PhotoGrid :images="property.image_url" />

    <section class="py-5 flex">
      <div class="md:w-3/5 w-full">
        <DetailsTab :property="property" />
      </div>
      <div class="sm:hidden"></div>
    </section>
  </div>
  <div v-else>
    <p>Property not found.</p>
  </div>
</template>

<script setup lang="ts">
import PhotoGrid from "@/components/PhotoGrid.vue";
import DetailsTab from "@/components/DetailsTab.vue";
import { ref, onMounted } from "vue";
import { usePropertiesStore } from "@/stores/properties";
import { useRoute } from "vue-router";
import type { IProperties } from "@/types";
import {
  ArrowUpTrayIcon,
  HeartIcon,
  MapPinIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";

const propertiesStore = usePropertiesStore();
const route = useRoute();

const property = ref<IProperties | null>(null);
const isLoading = ref(true);

const propertyId = route.params.id;
console.log("Id", propertyId);

onMounted(async () => {
  const propertyId = route.params.id as string;

  // Try to get the property by ID from the store
  property.value = propertiesStore.getPropertyById(propertyId) || null;

  // If property not found, fetch properties from API
  if (!property.value) {
    await propertiesStore.getProperties({});
    property.value = propertiesStore.getPropertyById(propertyId) || null;
  }

  isLoading.value = false;
});
</script>

<style scoped></style>
