<template>
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-lg mx-auto">
    <div>
      <label class="block text-sm font-medium text-gray-700" for="title">Title</label>
      <input v-model="form.title" type="text" id="title" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="content">Content</label>
      <textarea v-model="form.content" id="content" rows="5" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
      <p v-if="errors.content" class="text-red-600 text-sm mt-1">{{ errors.content }}</p>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="category">Category</label>
      <input v-model="form.category" type="text" id="category" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
      <p v-if="errors.category" class="text-red-600 text-sm mt-1">{{ errors.category }}</p>
    </div>
    <div class="flex space-x-2">
      <button type="button" @click="submit('publish')" :disabled="loading" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Publish</button>
      <button type="button" @click="submit('draft')" :disabled="loading" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">Draft</button>
    </div>
    <p v-if="apiError" class="text-red-600 text-sm">{{ apiError }}</p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Post } from '@/types/post';
import type { ValidationError } from '@/types/post';

interface Props {
  initial?: Partial<Post>;
  onSubmitSuccess: (payload: Omit<Post, 'id' | 'created_date' | 'updated_date'>, status: 'publish' | 'draft') => Promise<void>;
}

const props = defineProps<Props>();

const form = reactive({
  title: props.initial?.title || '',
  content: props.initial?.content || '',
  category: props.initial?.category || '',
});

const errors = reactive<{ title?: string; content?: string; category?: string }>({});
const apiError = ref<string>('');
const loading = ref(false);

function validate(): boolean {
  errors.title = form.title.trim().length >= 20 ? undefined : 'Title must be at least 20 characters';
  errors.content = form.content.trim().length >= 200 ? undefined : 'Content must be at least 200 characters';
  errors.category = form.category.trim().length >= 3 ? undefined : 'Category must be at least 3 characters';
  return !errors.title && !errors.content && !errors.category;
}

async function submit(status: 'publish' | 'draft') {
  apiError.value = '';
  if (!validate()) return;
  loading.value = true;
  const payload = {
    title: form.title.trim(),
    content: form.content.trim(),
    category: form.category.trim(),
    status,
  } as Omit<Post, 'id' | 'created_date' | 'updated_date'>;
  try {
    await props.onSubmitSuccess(payload, status);
  } catch (e: any) {
    apiError.value = e.message || 'Unexpected error';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
