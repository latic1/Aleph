<template>
  <div class="w-full border-t">
    <!-- Tab Navigation -->
    <div
      class="flex justify-between items-end pt-6 border-b pb-4 mb-5 text-gray-400 text-sm"
    >
      <div class="flex space-x-6">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="pb-2 transition-all duration-300 ease-in-out hover:text-blue-600"
          :class="{
            'border-b-4 border-blue-600 text-blue-600 font-semibold':
              activeTab === index,
          }"
          @click="setActiveTab(index)"
          :aria-selected="activeTab === index"
        >
          {{ tab.label }}
        </button>
      </div>
      <div>
        <p class="text-gray-400">Published July 01, 2024</p>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="w-full border-b">
      <div v-if="activeTab === 0" class="py-2">
        <p class="text-gray-600">{{ property.description }}</p>
        <div v-if="property.space" class="pt-4">
          <h4 class="font-semibold text-lg">The Space</h4>
          <p class="text-gray-600">{{ property.space }}</p>
        </div>
      </div>
      <div v-if="activeTab === 1" class="py-4">
        <h4 class="font-semibold text-lg">What this place offers</h4>
        <p class="text-gray-600 pb-2">
          Each home is fully equipped to meet your needs, with ample space and
          privacy.
        </p>
        <ul class="list-disc ml-5 text-gray-600">
          <li
            v-for="(offer, index) in property.whatWeOffer"
            :key="index"
            class="flex items-center"
          >
            <img :src="iconMap[offer]" alt="" class="w-5 h-5 mr-2" />
            {{ offer }}
          </li>
        </ul>
      </div>
      <div v-if="activeTab === 2" class="py-4">
        <div class="w-full grid grid-cols-1 sm:grid-cols-2">
          <div
            v-for="(review, index) in property.reviews"
            :key="index"
            class="mb-4"
          >
            <div class="flex items-center">
              <img
                src="@/assets/images/Vector.png"
                alt=""
                class="w-16 h-16 rounded-full border-2"
              />
              <div class="ml-3 space-x-2">
                <p>{{ review.name }}</p>
                <p class="text-gray-400 text-sm">{{ review.date }}</p>
              </div>
            </div>
            <p class="text-gray-600">"{{ review.comment }}"</p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 3" class="py-4">
        <p class="text-gray-600">About the host details here...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { PropertiesProp } from "@/types";

// Define the mapping of offers to icons
const iconMap: { [key: string]: string } = {
  "Mountain view": "/src/assets/icons/mountain.svg",
  "Shared beach access": "/src/assets/icons/beach.svg",
  "Private chef": "/src/assets/icons/chef.svg",
  Butler: "/src/assets/icons/butler.svg",
  "Cleaning available during stay": "/src/assets/icons/sweeping.svg",
  Bartender: "/src/assets/icons/bartender.svg",
  Wifi: "/src/assets/icons/wifi.svg",
};

const props = defineProps<{
  property: PropertiesProp;
}>();

// Define the tabs
const tabs = ref([
  { label: "Description" },
  { label: "What we offer" },
  { label: "Reviews" },
  { label: "About host" },
]);

// Active tab index
const activeTab = ref(0);

// Function to set the active tab
const setActiveTab = (index: number) => {
  activeTab.value = index;
};
</script>

<style scoped></style>
