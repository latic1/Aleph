<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

import BathTub from "@/components/icons/IconBathTub.vue";
import BedIcon from "@/components/icons/IconBed.vue";
import IconPeople from "@/components/icons/IconPeople.vue";
import { StarIcon } from "@heroicons/vue/24/outline";

import "swiper/css";
import "swiper/css/pagination";

interface PropertyProp {
  id: number;
  images: string[];
  title: string;
  location: string;
  rating: number;
  features: {
    baths: number;
    beds: number;
    guests: string;
  };
  price: number;
  currency: string;
  perNight: boolean;
}

defineProps<{
  property: PropertyProp;
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
      <SwiperSlide v-for="(image, index) in property.images" :key="index">
        <img
          :src="image"
          alt="Property Image"
          class="rounded-3xl w-full h-[260px] object-cover"
        />
      </SwiperSlide>
    </Swiper>

    <!-- Discount Badge -->
    <!-- <div
      v-show="property.discount"
      class="absolute left-2 top-2 gap-1 px-2 py-1 rounded-full flex bg-blue-500 text-white items-center z-50"
    >
      <img src="@/assets/images/Subtract.png" class="w-4 h-4" alt="Discount" />
      <p class="font-light text-xs">{{ property.discount }}</p>
    </div> -->

    <!-- <div class="flex gap-2 mt-3">
      <button
        v-for="tag in property.tags"
        :key="tag"
        class="py-1 px-2 rounded-full bg-gray-100 text-xs"
      >
        {{ tag }}
      </button>
    </div> -->

    <!-- Title and Location -->
    <div class="flex mt-3 justify-between">
      <div>
        <RouterLink :to="`/property/${property.id}`">
          <h2 class="font-semibold cursor-pointer hover:text-[#0074bd]">{{ property.title }}</h2>
        </RouterLink>
        <p class="text-sm text-gray-500">{{ property.location }}</p>
      </div>
      <div>
        <p class="flex items-center font-light">
          <StarIcon class="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {{ property.rating }}
        </p>
      </div>
    </div>

    <!-- Features and Pricing -->
    <div class="flex justify-between mt-4 items-center">
      <div class="flex border rounded-full items-center px-3 py-1 gap-2">
        <div class="flex items-center">
          <BathTub class="w-5 h-5" />{{ property.features.baths }}
        </div>
        <div class="flex items-center">
          <BedIcon class="w-5 h-5" />{{ property.features.beds }}
        </div>
        <div class="flex items-center">
          <IconPeople class="w-5 h-5" />{{ property.features.guests }}
        </div>
      </div>
      <p class="font-semibold">
        {{ property.currency }} {{ property.price }}
        <span class="text-xs font-normal"
          >/{{ property.perNight ? "n" : "stay" }}</span
        >
      </p>
    </div>
  </div>
</template>
