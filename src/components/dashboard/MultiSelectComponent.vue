<!-- MultiSelectComponent.vue -->
<template>
    <div class="relative">
      <label class="block font-medium text-gray-700">{{ label }}</label>
      <div class="mt-2 relative">
        <div
          class="w-full p-2 bg-white border border-gray-300 rounded-md cursor-pointer"
          @click="toggleDropdown"
        >
          <span class="text-gray-700">{{ selectedText }}</span>
          <span class="float-right">
            <ChevronDownIcon class="h-5 w-5" />
          </span>
        </div>
  
        <!-- Dropdown -->
        <div
          v-if="isOpen"
          class="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg"
        >
          <div class="max-h-60 overflow-auto">
            <div
              v-for="option in options"
              :key="option.value"
              class="p-2 hover:bg-gray-200 cursor-pointer"
              @click="toggleOption(option)"
            >
              <input
                type="checkbox"
                class="mr-2"
                :value="option.value"
                :checked="isSelected(option)"
              />
              <span>{{ option.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { ref, computed, type PropType } from "vue";
//   import { ChevronDownIcon } from "@heroicons/24/vue/solid";
  
  // Props
  const props = defineProps({
    options: {
      type: Array as PropType<{ label: string; value: string | number }[]>,
      required: true,
    },
    label: {
      type: String,
      default: "Select",
    },
  });
  
  // State
  const isOpen = ref(false);
  const selectedOptions = ref<{ label: string; value: string | number }[]>([]);
  
  // Methods
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const toggleOption = (option: { label: string; value: string | number }) => {
    const index = selectedOptions.value.findIndex((o) => o.value === option.value);
    if (index > -1) {
      selectedOptions.value.splice(index, 1); // Remove if already selected
    } else {
      selectedOptions.value.push(option); // Add if not selected
    }
  };
  
  const isSelected = (option: { label: string; value: string | number }) => {
    return selectedOptions.value.some((o) => o.value === option.value);
  };
  
  // Computed
  const selectedText = computed(() => {
    if (selectedOptions.value.length === 0) {
      return "Select options";
    }
    return selectedOptions.value.map((o) => o.label).join(", ");
  });
  </script>
  
  <style scoped>
  /* Customize the dropdown and checkbox styles */
  </style>
  