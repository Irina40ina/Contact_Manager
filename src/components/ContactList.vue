<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ContactItem from './ContactItem.vue';
import { ContactDataType } from '@/types/index.ts';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlus } from '@mdi/js';
// ################################## DATA ###########################################
const plus = mdiPlus;
// ################################## PROPS ###########################################
const props = defineProps<{
  contacts: ContactDataType[];
}>();
// ################################## EMITS ###########################################
const emits = defineEmits<{
  (e: 'selectContact', data: ContactDataType): void;
  (e: 'createContact'): void;
}>();
</script>

<template>
    <div class="contacts-container">
      <h2 class="contacts-title">Список контактов</h2>
      <!-- Блок с иконкой добавления контакта -->
      <div 
      class="add-contact-container"
      @click="() => emits('createContact')"
      >
        <svg-icon type="mdi" :path="plus"></svg-icon>
      </div>
      <!-- Список контактов -->
      <ul class="contacts-list">
        <ContactItem
          v-for="contact in props.contacts"
          :key="contact.id"
          :contact="contact"
          @select-contact="(data) => emits('selectContact', data)"
        />
      </ul>
    </div>
  </template>

<style scoped>
    .contacts-container {
        width: 80%;
        display: flex;
        flex-direction: column;
        max-height: 600px; 
        overflow-y: auto;
    }
    .contacts-container::-webkit-scrollbar {
        display: none; 
    }
    .contacts-title {
      font-size: 1.5rem;
      color: var(--bright-color-fg);
    }
    .add-contact-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--list-bc); 
      padding: 1rem;
      border-radius: 8px;
      box-shadow: var(--block-shadow); 
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .add-contact-container:hover {
        background-color: var(--add-block-hover);
    }
    .contacts-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    h2 {
        font-size: 1.5rem;
        margin-bottom: 16px;
    }
</style>