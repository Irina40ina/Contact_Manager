<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ContactDataType } from '@/types/index.ts';
// ################################## PROPS ###########################################
const props = defineProps<{
    contact: ContactDataType;
}>();
// ################################## EMITS ###########################################
const emits = defineEmits<{
    (e: 'selectContact', data: ContactDataType): void;
}>();
</script>

<template>
    <li 
    class="contact-item"
    @click="emits('selectContact', props.contact)"
    >
        <div class="contact-info">
            <p><strong>{{ props.contact.name }}</strong></p>
        </div>
    </li>
  </template>
  
<style scoped>
    .contact-item {
        list-style: none;
        margin: .5rem 0;
        cursor: pointer;
    }

    .contact-info {
        background-color: var(--list-bc); 
        padding: 1rem;
        border-radius: 8px;
        box-shadow: var(--block-shadow); 
        transition: background-color 0.3s ease;
    }

    .contact-info:hover {
        background-color: var(--list-bc-hover);
    }
</style>
