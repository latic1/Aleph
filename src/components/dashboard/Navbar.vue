<template>
  <div class="flex items-center justify-end py-3 h-20 bg-gray-900">
    <div class="flex items-center pr-4">
      <div className="dropdown dropdown-end">
        <div
          tabIndex="{0}"
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex="{0}"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between"> Profile </a>
          </li>
          <li><a>Settings</a></li>
          <li><a @click="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const logout = async () => {
  await authStore.handleLogout();
};
</script>

<style scoped></style>
