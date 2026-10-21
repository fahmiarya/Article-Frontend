<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Preview (Published Articles)</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
    <div v-else>
      <div v-if="posts.length === 0" class="text-center mt-4">No published articles.</div>
      <div class="grid gap-4" v-else>
        <div v-for="post in posts" :key="post.id" class="border p-4 rounded shadow-sm">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p class="text-gray-600">Category: {{ post.category }}</p>
          <p class="mt-2">{{ post.content.slice(0, 150) }}{{ post.content.length > 150 ? '...' : '' }}</p>
        </div>
      </div>
      <Pagination
        :has-prev="offset > 0"
        :has-next="posts.length === limit"
        :current-page="(offset / limit) + 1"
        @prev="prevPage"
        @next="nextPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { getPosts } from '@/api/posts';
import type { Post } from '@/types/post';
import Pagination from '@/components/Pagination.vue';

const limit = 6;
const offset = ref(0);
const posts = ref<Post[]>([]);
const loading = ref(false);
const error = ref<string>('');

function fetch() {
  loading.value = true;
  error.value = '';
  getPosts(limit, offset.value, 'publish')
    .then((data) => (posts.value = data))
    .catch((e) => (error.value = e.message || 'Failed to load'))
    .finally(() => (loading.value = false));
}

function prevPage() { if (offset.value >= limit) offset.value -= limit; }
function nextPage() { if (posts.value.length === limit) offset.value += limit; }

watch(offset, fetch);
onMounted(fetch);
</script>

<style scoped></style>
