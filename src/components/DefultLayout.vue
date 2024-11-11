<template>
  <div>
    <NavBar />
    <div class="mx-5 md:mx-10 lg:mx-16 my-10"><RouterView /></div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<style scoped></style>
