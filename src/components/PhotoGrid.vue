<template>
  <div class="py-10">
    <!-- Handle 1 picture -->
    <div class="h-[421px] lg:h-[620px] w-full rounded-3xl">
      <img
        :src="images"
        class="w-full h-full object-cover object-center rounded-3xl"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: string;
}

defineProps<Props>();
</script>

<style scoped></style>
