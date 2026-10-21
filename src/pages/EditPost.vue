<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Edit Article</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
    <PostForm v-else :initial="post" :onSubmitSuccess="handleUpdate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/PostForm.vue';
import { getPostById, updatePost } from '@/api/posts';
import type { Post } from '@/types/post';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const post = ref<Partial<Post>>({});
const loading = ref(true);
const error = ref<string>('');

onMounted(async () => {
  try {
    const data = await getPostById(id);
    post.value = data;
  } catch (e: any) {
    error.value = e.message || 'Failed to load article';
  } finally {
    loading.value = false;
  }
});

async function handleUpdate(payload: Omit<Post, 'id' | 'created_date' | 'updated_date'>, status: 'publish' | 'draft') {
  await updatePost(id, { ...payload, status });
  router.push({ name: 'AllPosts' });
}
</script>

<style scoped></style>
