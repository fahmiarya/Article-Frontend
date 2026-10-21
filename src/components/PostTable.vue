<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="post in posts" :key="post.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ post.title }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ post.category }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <button @click="emitEdit(post.id)" class="text-blue-600 hover:underline mr-2">Edit</button>
          <button v-if="post.status !== 'trash'" @click="emitTrash(post.id)" class="text-red-600 hover:underline">Trash</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Post } from '@/types/post';
import { defineEmits, defineProps } from 'vue';

const props = defineProps<{ posts: Post[] }>();
const emit = defineEmits(['edit', 'trash']);

function emitEdit(id: number) {
  emit('edit', id);
}
function emitTrash(id: number) {
  if (confirm('Move this article to Trash?')) {
    emit('trash', id);
  }
}
</script>

<style scoped></style>
