<template>
  <Hero />
  <Filters
    :filters="filters"
    :selectedFilter="selectedFilter"
    :selectFilter="selectFilter"
    :properties="properties"
    :selectSortValue="selectSortValue"
  />
  <section class="my-8">
    <Collections :properties="sortedProperties" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Hero from "@/components/Hero.vue";
import Filters from "@/components/Filters.vue";
import Collections from "@/components/Collections.vue";
import { usePropertiesStore } from "@/stores/properties";
import { storeToRefs } from "pinia";

const propertiesStore = usePropertiesStore();
const { properties } = storeToRefs(propertiesStore);

propertiesStore.getProperties({});

const selectedFilter = ref<string>("All");
const selectedSortValue = ref<string>("lo");

// Extract unique tags from properties dynamically
const filters = computed(() => {
  const locations = properties.value.flatMap((property) => property.location);
  return ["All", ...new Set(locations)];
});

// Filter properties based on the selected filter
const filteredProperties = computed(() => {
  if (selectedFilter.value === "All") {
    return properties.value;
  }
  return properties.value.filter((property) =>
    property.location.includes(selectedFilter.value)
  );
});

// Sort properties based on the selected sort value
const sortedProperties = computed(() => {
  const sorted = [...filteredProperties.value];
  if (selectedSortValue.value === "highest") {
    return sorted.sort((a, b) => Number(b.price) - Number(a.price));
  }
  return sorted.sort((a, b) => Number(a.price) - Number(b.price));
});

// Methods to update the selected filter and sort value
const selectFilter = (filter: string) => {
  selectedFilter.value = filter;
};

const selectSortValue = (sortValue: string) => {
  selectedSortValue.value = sortValue;
};
</script>
