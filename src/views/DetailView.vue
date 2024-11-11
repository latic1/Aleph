<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <div class="w-full flex items-center justify-between">
      <div class="w-full">
        <h1 class="font-bold sm:text-3xl lg:text-5xl">{{ property?.title }}</h1>
        <div class="flex gap-2 lg:gap-5 mt-2">
          <div>
            <p class="flex items-center font-light">
              <span><StarIcon class="w-5 h-5 fill-yellow-400 text-yellow-400" /></span>
              {{ property?.rating }}
              <span class="text-gray-400">( <span>{{ property?.reviews.length }}</span> reviews )</span>
            </p>
          </div>
          <div>
            <p class="flex items-center font-light">
              <span><MapPinIcon class="w-5 h-5" /></span>
              <span class="text-gray-400">{{ property?.location }}</span>
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
        <button class="py-1 lg:py-2 px-2 lg:px-4 border border-slate-400 rounded-full inline-flex items-center gap-2">
          <HeartIcon class="w-4 h-4" /> Save
        </button>
        <button class="py-1 lg:py-2 px-2 lg:px-4 border border-slate-400 rounded-full inline-flex items-center gap-2">
          <ArrowUpTrayIcon class="w-4 h-4" /> Share
        </button>
      </div>
    </div>

    <PhotoGrid :images="images" />

    <div class="flex items-center">
      <div class="space-x-2">
        <div class="flex border rounded-full items-center px-3 py-1 gap-2">
          <div class="flex items-center">
            <IconBathTub class="w-5 h-5" />{{ property?.features.baths }}
          </div>
          <div class="flex items-center">
            <BedIcon class="w-5 h-5" />{{ property?.features.beds }}
          </div>
          <div class="flex items-center">
            <IconPeople class="w-5 h-5" />{{ property?.features.guests }}
          </div>
        </div>
      </div>
    </div>

    <section class="py-5 flex">
      <div class="md:w-3/5 w-full">
        <DetailsTab :property="property" />
      </div>
      <div class="sm:hidden"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PhotoGrid from "@/components/PhotoGrid.vue";
import DetailsTab from "@/components/DetailsTab.vue";
import { ref, onMounted } from "vue";
import { usePropertiesStore } from "@/stores/properties";
import { useRoute } from "vue-router";
import type { PropertiesProp } from "@/types";
import IconPeople from "@/components/icons/IconPeople.vue";
import IconBathTub from "@/components/icons/IconBathTub.vue";
import BedIcon from "@/components/icons/IconBed.vue";
import { ArrowUpTrayIcon, HeartIcon, MapPinIcon, StarIcon, UserCircleIcon } from "@heroicons/vue/24/outline";

const propertiesStore = usePropertiesStore();
const route = useRoute();

const property = ref<PropertiesProp | null>(null);
const images = ref<string[]>([]);
const isLoading = ref(true);

onMounted(() => {
  const propertyId = Number(route.params.id);
  property.value = propertiesStore.getPropertyById(propertyId);
  if (property.value) {
    images.value = property.value.images;
  }
  isLoading.value = false;
});
</script>

<style scoped></style>
