<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Add New Article</h1>
    <PostForm :onSubmitSuccess="handleCreate" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import PostForm from '@/components/PostForm.vue';
import { createPost } from '@/api/posts';
import type { Post } from '@/types/post';

const router = useRouter();

async function handleCreate(payload: Omit<Post, 'id' | 'created_date' | 'updated_date'>, status: 'publish' | 'draft') {
  await createPost({ ...payload, status });
  router.push({ name: 'AllPosts' });
}
</script>

<style scoped></style>
