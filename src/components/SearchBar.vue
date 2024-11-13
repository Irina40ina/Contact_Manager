<script setup lang="ts">
import { ref, defineEmits } from 'vue';
// ################################## DATA ###########################################
const query = ref('');
// ################################## EMITS ###########################################
const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();
// ################################## METHODS ###########################################
function onSearch() {
  emit('search', query.value);
};
</script>
<template>
  <div class="search-container">
    <input
    class="search-input"
    v-model="query"
    @input="onSearch"
    placeholder="Введите контакт для поиска..."
    />
  </div>
</template>
  
<style scoped>
    .search-container {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    background-color: var(--list-bc);
    border-radius: 8px;
    box-shadow: var(--block-shadow);
    transition: box-shadow 0.3s ease;
}

.search-container:hover {
    box-shadow: var(--block-shadow-hover);
}

.search-input {
    flex: 1;
    border: none;
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 8px;
    outline: none;
    transition: background-color 0.3s ease;
}

.search-input::placeholder {
    color: #999;
}

</style>