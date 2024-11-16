<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Create New Property</h1>

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
          <label for="location" class="block text-sm font-medium">Location</label>
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
          <label for="description" class="block text-sm font-medium">Description</label>
          <textarea
            v-model="property.description"
            id="description"
            placeholder="Enter property description"
            class="w-full mt-2 p-2 border rounded-md"
            rows="6"
            required
          ></textarea>
        </div>

        <!-- File Upload -->
        <div class="sm:col-span-6">
          <label for="cover-photo" class="block text-sm font-medium">Cover Photo</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <!-- Icon Path -->
              </svg>
              <div class="mt-4 flex text-sm">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    @change="handleFileUpload"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <!-- Property Type -->
        <div class="sm:col-span-3">
          <label for="type-select" class="block text-sm font-medium">Property Type</label>
          <select
            v-model="property.type"
            id="type-select"
            class="w-full mt-2 p-2 border rounded-md"
          >
            <option v-for="type in propertyTypes" :key="type.value" :value="type.value">
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
        <span v-if="loading" class="loading loading-spinner loading-md"></span>
        Create Property
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePropertiesStore } from "@/stores/properties";
import { useRouter } from "vue-router";

// Store
const propertyStore = usePropertiesStore();
const router = useRouter();

// Property Options
const propertyTypes = [
  { label: "Land", value: "land" },
  { label: "Commercial", value: "commercial" },
  { label: "Industrial", value: "industrial" },
];

const loading = ref(false);
const setLoading = (state: boolean) => (loading.value = state);

// Property Object
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

// Submit Form
const submitForm = async () => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", property.value.name);
    formData.append("location", property.value.location);
    formData.append("description", property.value.description);
    
    // Format contact number
    if (property.value.contact.startsWith("0")) {
      property.value.contact = `233${property.value.contact.slice(1)}`;
    }
    formData.append("contact", property.value.contact);

    formData.append("price", property.value.price.toString());
    formData.append("upload_type", property.value.type);

    // Add images to FormData
    property.value.image.forEach((image) => {
      formData.append("image", image);
    });

    // Call the store action to create the property
    await propertyStore.createProperty(formData);
    setLoading(false);

    // Redirect to properties list
    router.push({ name: "properties" });
  } catch (error) {
    setLoading(false);
    console.error("Error creating property:", error);
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
