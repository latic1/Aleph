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
            <a href="/" target="_blank">
              <img src="@/assets/images/alephlogo.png" class="w-16" />
            </a>
            <p class="m-0 text-2xl font-bold text-gray-900">
              Login to your Account
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="mt-8">
            <div class="space-y-5">
              <div v-if="message" :class="messageClass" class="py-3 w-full text-center">
                {{ message }}
              </div>
              <div>
                <label for="email" class="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div class="mt-2.5">
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    placeholder="Enter email to get started"
                    class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>

                  <a
                    href="/admin/auth/forgot-password"
                    class="text-sm font-medium transition-all duration-200 text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div class="mt-2.5">
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                >
                  <span v-if="loading">Logging in...</span>
                  <span v-else>Log in</span>
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
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const message = ref("");
const loading = ref(false);

// Computed class for message display
const messageClass = computed(() =>
  message.value.includes("successful") ? "text-green-600 bg-green-200" : "text-red-600 bg-red-200"
);

const handleLogin = async () => {
  message.value = ""; 
  if (email.value && password.value) {
    loading.value = true;
    try {
      const response = await authStore.handleLogin({
        email: email.value,
        password: password.value,
      });
      message.value = response || "Login successful!";
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped></style>
