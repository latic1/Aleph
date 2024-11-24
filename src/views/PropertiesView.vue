<template>
  <div class="p-4">
    <!-- Nav Bar with Search and Toggle View -->
    <div
      class="flex items-center justify-between mb-4 bg-slate-500 py-2 px-4 rounded"
    >
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search properties..."
        class="border rounded-md p-2 w-1/3"
      />

      <div class="flex">
        <!-- Toggle View Button -->
        <button
          @click="toggleView"
          class="px-4 py-2 rounded-md flex items-center"
        >
          <template v-if="isListView">
            <Squares2X2Icon class="h-7 w-7 text-white" />
          </template>
          <template v-else>
            <ListBulletIcon class="h-7 w-7 text-white" />
          </template>
        </button>

        <!-- create property button -->
        <button>
          <RouterLink :to="{ name: 'createProperties' }" class="btn">
            create propert
          </RouterLink>
        </button>
      </div>
    </div>
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="w-full">
      <table
        class="table table-lg w-full rounded border border-base-300 bg-base-100"
      >
        <thead>
          <tr class="text-left">
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 3" :key="index" class="overflow-x-auto">
            <td><div class="skeleton h-4 w-24"></div></td>
            <td><div class="skeleton h-4 w-20"></div></td>
            <td><div class="skeleton h-4 w-20"></div></td>
            <td><div class="skeleton h-4 w-16"></div></td>
            <td><div class="skeleton h-4 w-32"></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Properties Display -->
    <div v-if="isListView" class="mt-4">
      <table class="w-full table-fixed table">
        <thead>
          <tr class="rounded-t-xl">
            <th class="py-4 px-6 text-left font-bold uppercase">Name</th>
            <th class="py-4 px-6 text-left font-bold uppercase">location</th>
            <th class="py-4 px-6 text-left font-bold uppercase">Price</th>
            <th class="py-4 px-6 text-left font-bold uppercase">Status</th>
            <th class="py-4 px-6 text-left font-bold uppercase">Action</th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="property in filteredProperties" :key="property.id">
            <td class="py-4 px-6">
              {{ property.name }}
            </td>
            <td class="py-4 px-6 truncate">
              {{ property.location }}
            </td>
            <td class="py-4 px-6">
              {{ property.price }}
            </td>
            <td class="py-4 px-6">
              <span
                class="bg-green-500 text-white py-1 px-2 rounded-full text-xs"
                >Active</span
              >
              <!-- <span :class="property.status === 'Active' ? 'bg-green-500' : 'bg-red-500'">
  {{ property.status }}
</span> -->
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center gap-1">
                <RouterLink :to="`/admin/properties/edit/${property.id}`">
                  <button
                    class="p-2 rounded-full group transition-all duration-500 flex item-center"
                  >
                    <PencilSquareIcon class="h-5 w-5 text-indigo-500" />
                  </button>
                </RouterLink>

                <button
                  @click="deleteProperty(property.id)"
                  class="p-2 rounded-full group transition-all duration-500 flex item-center"
                >
                  <TrashIcon class="h-5 w-5 text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card View -->
    <div
      v-else
      class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="property in filteredProperties"
        :key="property.id"
        class="bg-white rounded-lg shadow-md p-4"
      >
        <img
          :src="property.image_url[0]"
          alt="Property Image"
          class="w-full h-40 object-cover rounded-md"
        />
        <h2 class="mt-2 text-lg font-semibold">{{ property.name }}</h2>
        <p class="mb-2 text-sm text-gray-500">{{ property.location }}</p>
        <p class="text-gray-600 truncate">{{ property.description }}</p>

        <div class="mt-4 flex justify-between">
          <RouterLink
            :to="`/admin/properties/edit/${property.id}`"
            class="text-blue-500"
          >
            <PencilSquareIcon class="h-5 w-5 text-indigo-500" />
          </RouterLink>

          <button @click="deleteProperty(property.id)" class="text-red-500">
            <TrashIcon class="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { usePropertiesStore } from "@/stores/properties";
import {
  ListBulletIcon,
  Squares2X2Icon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

// Property store
const propertyStore = usePropertiesStore();

// Reactive variables
const searchQuery = ref("");
const isListView = ref(true);
let isLoading: boolean;

// Get properties from store
onMounted(async () => {
  isLoading = true;
  propertyStore.getProperties({});
  isLoading = false;
});

const properties = computed(() => propertyStore.properties);

// Filtered properties based on search query
const filteredProperties = computed(() =>
  properties.value.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// Toggle view function
const toggleView = () => {
  isListView.value = !isListView.value;
};

// Delete property function
const deleteProperty = (id: string) => {
  propertyStore.deleteProperty(id);
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
