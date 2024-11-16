<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content -->
    <div class="flex flex-col flex-1 overflow-y-auto">
      <NavBar />
      <div class="overflow-y-scroll"><RouterView></RouterView></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
</script>

<style scoped></style>
