<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import type { IProperties } from "@/types";

defineProps<{
  property: IProperties;
}>();
</script>

<template>
  <div class="rounded-full w-full relative">
    <!-- Swiper image carousel -->
    <Swiper
      :slides-per-view="1"
      :pagination="{ clickable: true }"
      :modules="[Pagination, Navigation]"
      :navigation="true"
      class="rounded-3xl h-[260px]"
    >
      <SwiperSlide>
        <img
          :src="property.image_url"
          alt="Property Image"
          class="rounded-3xl w-full h-[260px] object-cover"
        />
      </SwiperSlide>
    </Swiper>

    <!-- Title and Location -->
    <div class="mt-3">
      <div>
        <RouterLink :to="`/property/${property.id}`">
          <h2 class="font-semibold cursor-pointer hover:text-[#0074bd]">
            {{ property.name }}
          </h2>
        </RouterLink>
        <p class="text-sm text-gray-500">{{ property.location }}</p>
        <p class="font-semibold">GHS {{ property.price }}</p>
      </div>
    </div>
  </div>
</template>
