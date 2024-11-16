<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Edit Property</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Property Title -->
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="title" class="block text-sm font-medium">Title</label>
          <input
            v-model="property.name"
            type="text"
            id="title"
            placeholder="Enter property title"
            class="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div class="sm:col-span-3">
          <label for="location" class="block text-sm font-medium"
            >Location</label
          >
          <input
            v-model="property.location"
            type="text"
            id="location"
            placeholder="Enter property location"
            class="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <!-- Property Description -->
        <div class="sm:col-span-6">
          <label for="description" class="block text-sm font-medium"
            >Description</label
          >
          <textarea
            v-model="property.description"
            id="description"
            placeholder="Enter property description"
            class="w-full mt-2 p-2 border rounded-md"
            rows="6"
            required
          ></textarea>
        </div>
     
        <div class="sm:col-span-3">
          <label for="file-upload" class="block text-sm font-medium"
            >Change Image</label
          >
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            @change="handleFileUpload"
            class="w-full mt-2 p-1 border rounded-md"
          />
        </div>

        <!-- Property Type -->
        <div class="sm:col-span-3">
          <label for="type-select" class="block text-sm font-medium"
            >Property Type</label
          >
          <select
            v-model="property.type"
            id="type-select"
            class="w-full mt-2 p-2 border rounded-md"
          >
            <option
              v-for="type in propertyTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>

        <!-- Price -->
        <div class="sm:col-span-3">
          <label for="price" class="block text-sm font-medium">Price</label>
          <input
            v-model="property.price"
            type="number"
            id="price"
            placeholder="Enter property price"
            class="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <!-- Contact -->
        <div class="sm:col-span-3">
          <label for="contact" class="block text-sm font-medium">Contact</label>
          <input
            v-model="property.contact"
            type="text"
            id="contact"
            placeholder="Enter contact"
            class="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary mt-4">
        <span
          v-if="isLoading"
          class="loading loading-spinner loading-md"
        ></span>
        Edit Property
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePropertiesStore } from "@/stores/properties";
import { useRoute } from "vue-router";

const propertiesStore = usePropertiesStore();
const route = useRoute();

const isLoading = ref(true);

const property = ref({
  name: "",
  location: "",
  description: "",
  price: 0,
  image: [] as File[],
  contact: "",
  type: "",
});

// Handle file uploads
const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    property.value.image = Array.from(files);
  }
};

const propertyTypes = ref([
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
]);
const propertyId = route.params.id as string;

onMounted(async () => {
  const propertyId = route.params.id as string;


  // Fetch property from store or API
  const fetchedProperty = propertiesStore.getPropertyById(propertyId);
  if (fetchedProperty) {
    Object.assign(property.value, fetchedProperty);
  }

  isLoading.value = false;
});

const submitForm = async () => {
  isLoading.value = true;
  const data = new FormData();

  data.append("name", property.value.name);
  data.append("location", property.value.location);
  data.append("description", property.value.description);
  data.append("price", property.value.price.toString());
  data.append("contact", property.value.contact);
  data.append("type", property.value.type);

  // Append files
  property.value.image.forEach((file, index) => {
    data.append(`image[${index}]`, file);
  });

  try {
    await propertiesStore.editProperty(data, propertyId);
    console.log("Form Submitted:", property.value);
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.loading {
  @apply animate-spin mr-2;
}
</style>
