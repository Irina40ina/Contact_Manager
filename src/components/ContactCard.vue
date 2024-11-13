<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ContactDataType } from '@/types/index.ts';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDelete, mdiNoteEdit } from '@mdi/js';
// ################################## DATA ###########################################
const crash = mdiDelete;
const noteEdit = mdiNoteEdit;
// ################################## PROPS ###########################################
const props = defineProps<{
    openedContact: ContactDataType;
}>();
// ################################## EMITS ###########################################
const emits = defineEmits<{
    (e: 'close'): void,
    (e: 'editContact'): void,
    (e: 'deleteContact'): void,
}>();
</script>
<template>
    <div class="contact-card">
        <h2 class="contact-card__name">{{ props.openedContact.name }}</h2>
        <p class="contact-card__phone">{{ props.openedContact.phone }}</p>
        <p class="contact-card__email">{{ props.openedContact.email }}</p>
        <div class="contact-card__actions">
          <svg-icon 
          class="icon" 
          type="mdi" 
          :path="noteEdit"
          @click="emits('editContact')"
          ></svg-icon>
          <svg-icon 
          class="icon" 
          type="mdi" 
          :path="crash"
          @click="emits('deleteContact')"
          ></svg-icon>
        </div>
    </div>
</template>

<style scoped>
    .contact-card {
        min-width: 300px;
        max-width: max-content;
        padding: 1rem;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-family: Arial, sans-serif;
        color: #333;
        transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.contact-card__name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.contact-card__phone,
.contact-card__email,
.contact-card__email {
  font-size: 0.9rem;
  margin: 4px 0;
  color: #555;
}
.contact-card__actions {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}
.icon {
  cursor: pointer;
  margin: 0 .2rem;
}
</style>