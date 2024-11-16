<template>
  <div class="hidden md:flex flex-col w-64 bg-gray-800 ">
    <div class="flex items-center space-x-3 px-5 h-20 bg-gray-900">
      <RouterLink :to="{ name: 'home' }">
        <img
          src="@/assets/images/alephlogo.png"
          class="w-16 shrink-0"
          alt="aleph logo"
        />
      </RouterLink>
    </div>
    <div class="flex flex-col flex-1 overflow-y-auto">
      <nav class="flex-1 px-2 py-4 bg-gray-800">
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 transition duration-200"
        >
          <Squares2X2Icon class="h-6 w-6 mr-2" />
          Dashboard
        </RouterLink>
        <RouterLink
          :to="{ name: 'properties' }"
          class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 transition duration-200"
        >
          <BuildingOffice2Icon class="h-6 w-6 mr-2" />

          properties
        </RouterLink>

        <RouterLink
          :to="{ name: '' }"
          class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 transition duration-200"
        >
          <UserGroupIcon class="h-6 w-6 mr-2" />

          Users
        </RouterLink>
        <RouterLink
          :to="{ name: '' }"
          class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 transition duration-200"
        >
          <Cog6ToothIcon class="h-6 w-6 mr-2" />

          Settings
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingOffice2Icon,
  Cog6ToothIcon,
  GifIcon,
  Square2StackIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
</script>

<style scoped></style>
