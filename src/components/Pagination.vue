<template>
  <div class="flex justify-between items-center mt-4">
    <button @click="prev" :disabled="!hasPrev" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Previous</button>
    <span>Page {{ currentPage }}</span>
    <button @click="next" :disabled="!hasNext" class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ hasPrev: boolean; hasNext: boolean; currentPage: number }>();
const emit = defineEmits(['prev', 'next']);

function prev() { emit('prev'); }
function next() { emit('next'); }
</script>

<style scoped></style>
