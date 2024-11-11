<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Create New Property</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Property Title -->
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="title" class="block text-gray-700">Title</label>
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
          <label for="location" class="block text-gray-700">Location</label>
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
        <div class="sm:col-span-3">
          <label for="description" class="block text-gray-700"
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

        <!-- Space -->
        <!-- <div class="sm:col-span-3">
          <label for="space" class="block text-gray-700">Space</label>
          <textarea
            v-model="property.space"
            id="space"
            placeholder="Enter property space"
            class="w-full mt-2 p-2 border rounded-md"
            rows="6"
            required
          ></textarea>
        </div> -->

        <!-- File Upload -->
        <div class="sm:col-span-3">
          <label
            for="cover-photo"
            class="block text-sm font-medium text-gray-900"
          >
            Cover photo
          </label>
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          >
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <!-- Icon Path -->
              </svg>
              <div class="mt-4 flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    @change="handleFileUpload"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <!-- Multi-Select -->
        <div class="sm:col-span-3">
          <select name="type" v-model="property.type" id="type-select">
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
          <label for="price" class="block text-gray-700">Price</label>
          <input
            v-model="property.price"
            type="number"
            id="price"
            placeholder="Enter property price"
            class="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <!-- Discount -->
        <div class="sm:col-span-3">
          <label for="discount" class="block text-gray-700">Contact</label>
          <input
            v-model="property.contact"
            type="text"
            id="contact"
            placeholder="Enter Contact"
            class="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
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
  { label: "Commercial", value: "Commercial" },
  { label: "Industrial", value: "Industrial" },
];

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
    const formData = new FormData();
    formData.append("name", property.value.name);
    formData.append("location", property.value.location);
    formData.append("description", property.value.description);
    // Modify the phone_number to remove the leading 0 and add 233
    if (property.value.contact.startsWith("0")) {
      property.value.contact = `233${property.value.contact.slice(1)}`;
    }
    formData.append("contact", property.value.contact);

    formData.append("price", property.value.price.toString());
    formData.append("upload_type", property.value.type);

    // Add images to FormData
    property.value.image.forEach((image, index) => {
      formData.append("image", image);
    });

    // Call the store action to create the property
    await propertyStore.createProperty(formData);

    // Redirect to properties list
    router.push({ name: "properties" });
  } catch (error) {
    console.error("Error creating property:", error);
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
