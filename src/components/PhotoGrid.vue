<template>
  <div class="py-10">
    <!-- Handle 4 or more pictures -->
    <div
      v-if="images.length >= 4"
      class="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-3 h-[421px] lg:h-[620px] w-full rounded-3xl"
      
    >
      <div class="w-full h-full">
        <img
          :src="images[0]"
          class="w-full h-full object-cover object-center rounded-l-3xl"
          alt=""
        />
      </div>

      <div class="w-full h-full grid grid-cols-2 gap-1 lg:gap-3">
        <div class="w-full h-full col-span-2">
          <img
            :src="images[1]"
            class="w-full h-full object-cover object-center rounded-tr-3xl"
            alt=""
          />
        </div>
        <div class="w-full h-full">
          <img
            :src="images[2]"
            class="w-full h-full object-cover object-center"
            alt=""
          />
        </div>
        <div class="w-full h-full ">
          <img
            :src="images[3]"
            class="w-full h-full object-cover object-center rounded-br-3xl"
            alt=""
          />
          <!-- <button
            class="text-xs lg:text-base absolute bottom-6 left-1/2 py-2 rounded-full text-white -translate-x-1/2 px-4 bg-white bg-opacity-40 border border-white"
          >
            Show all photo
          </button> -->
        </div>
      </div>
    </div>

    <!-- Handle 3 pictures -->
    <div
      v-else-if="images.length === 3"
      class="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-3 h-[421px] lg:h-[620px] w-full rounded-3xl"
    >
      <div class="w-full h-full">
        <img
          :src="images[0]"
          class="w-full h-full object-cover object-center rounded-l-3xl"
          alt=""
        />
      </div>

      <div class="w-full h-full grid grid-cols-1 gap-1 lg:gap-3">
        <div class="w-full h-full">
          <img
            :src="images[1]"
            class="w-full h-full object-cover object-center rounded-tr-3xl"
            alt=""
          />
        </div>
        <div class="w-full h-full relative">
          <img
            :src="images[2]"
            class="w-full h-full object-cover object-center rounded-br-3xl"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- Handle 2 pictures -->
    <div
      v-else-if="images.length === 2"
      class="grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-3 h-[421px] lg:h-[620px] w-full rounded-3xl"
    >
      <div class="w-full h-full">
        <img
          :src="images[0]"
          class="w-full h-full object-cover object-center rounded-l-3xl"
          alt=""
        />
      </div>

      <div class="w-full h-full">
        <img
          :src="images[1]"
          class="w-full h-full object-cover object-center rounded-r-3xl"
          alt=""
        />
      </div>
    </div>

    <!-- Handle 1 picture -->
    <div
      v-else-if="images.length === 1"
      class="h-[421px] lg:h-[620px] w-full rounded-3xl"
    >
      <img
        :src="images[0]"
        class="w-full h-full object-cover object-center rounded-3xl"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: string[];
}

defineProps<Props>();
</script>

<style scoped></style>
