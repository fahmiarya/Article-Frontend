<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">All Posts</h1>
    <div class="flex space-x-4 mb-4">
      <button @click="setStatus('publish')" :class="tabClass('publish')">Published</button>
      <button @click="setStatus('draft')" :class="tabClass('draft')">Drafts</button>
      <button @click="setStatus('trash')" :class="tabClass('trash')">Trashed</button>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
    <div v-else>
      <PostTable :posts="posts" @edit="goEdit" @trash="handleTrash" />
      <Pagination
        :has-prev="offset > 0"
        :has-next="posts.length === limit"
        :current-page="(offset / limit) + 1"
        @prev="prevPage"
        @next="nextPage"
      />
      <div v-if="posts.length === 0" class="text-center mt-4">No articles found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PostTable from '@/components/PostTable.vue';
import Pagination from '@/components/Pagination.vue';
import { getPosts, deletePost } from '@/api/posts';
import type { Post } from '@/types/post';

const router = useRouter();

const limit = 10;
const offset = ref(0);
const status = ref<string>('publish'); // default to published
const posts = ref<Post[]>([]);
const loading = ref(false);
const error = ref<string>('');

function fetchPosts() {
  loading.value = true;
  error.value = '';
  getPosts(limit, offset.value, status.value || undefined)
    .then((data) => {
      posts.value = data;
    })
    .catch((e) => {
      error.value = e.message || 'Failed to load articles';
    })
    .finally(() => {
      loading.value = false;
    });
}

function setStatus(s: string) {
  status.value = s;
  offset.value = 0; // reset pagination when tab changes
}

function tabClass(s: string) {
  return s === status.value || (status.value === '' && s === 'publish')
    ? 'px-3 py-1 bg-blue-600 text-white rounded'
    : 'px-3 py-1 bg-gray-200 text-gray-800 rounded';
}

function prevPage() {
  if (offset.value >= limit) offset.value -= limit;
}
function nextPage() {
  if (posts.value.length === limit) offset.value += limit;
}

function goEdit(id: number) {
  router.push({ name: 'EditPost', params: { id } });
}

function handleTrash(id: number) {
  deletePost(id)
    .then(() => fetchPosts())
    .catch((e) => (error.value = e.message || 'Failed to trash'));
}

watch([offset, status], fetchPosts);

onMounted(fetchPosts);
</script>

<style scoped></style>
