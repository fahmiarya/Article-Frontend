<template>
  <nav class="bg-white shadow p-4 flex space-x-4">
    <router-link to="/" class="text-blue-600 hover:underline" active-class="font-bold">All Posts</router-link>
    <router-link to="/add" class="text-blue-600 hover:underline" active-class="font-bold">Add New</router-link>
    <router-link to="/preview" class="text-blue-600 hover:underline" active-class="font-bold">Preview</router-link>
  </nav>
  <main class="p-4">
    <slot />
  </main>
</template>

<script setup lang="ts">
// No script needed – layout only
</script>

<style scoped></style>
