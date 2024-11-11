<template>
    <section class="relative py-10 bg-gray-900 sm:py-16 lg:py-24 h-screen">
      <div class="absolute inset-0">
        <img
          class="object-cover w-full h-full"
          src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/2/man-eating-noodles.jpg"
          alt=""
        />
      </div>
      <div class="absolute inset-0 bg-gray-900/20"></div>
  
      <div class="relative max-w-lg px-4 mx-auto sm:px-0">
        <div class="overflow-hidden bg-white rounded-md shadow-md">
          <div class="px-4 py-6 sm:px-8 sm:py-7">
            <div class="flex flex-col items-center justify-center gap-2 mb-8">
              <img src="@/assets/images/alephlogo.png" class="w-16" />
              <p class="m-0 text-2xl font-bold text-gray-900">
                Forgot Password
              </p>
            </div>
  
            <form @submit.prevent="handleSubmit" class="mt-8">
              <div class="space-y-5">
                <div>
                  <label for="email" class="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="email"
                      v-model="email"
                      id="email"
                      placeholder="Enter your email"
                      class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  
  const email = ref('');
  const toast = useToast();
  
  const handleSubmit = () => {
    if (!email.value) {
      toast.error('Please enter your email address');
      return;
    }
  
    // Simulate API call
    setTimeout(() => {
      toast.success('Reset link sent to your email!');
      email.value = ''; // Clear the email input
    }, 1000);
  };
  </script>
  
  <style scoped></style>
  