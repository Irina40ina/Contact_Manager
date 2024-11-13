import { defineStore } from "pinia";
import { ref } from 'vue';
import type { Ref } from 'vue';
import { ContactDataType } from '@/types/index.ts';

export default defineStore('mainStore', () => {
    
    const contacts: Ref<ContactDataType[]> = ref([
        { id: 1, name: 'Alice', phone: '123-456-7890', email: 'alice@mail.ru' },
        { id: 2, name: 'Bob', phone: '987-654-3210', email: 'bob@gmail.com' },
        { id: 3, name: 'Charlie', phone: '555-555-5555', email: 'charlie@gmail.com' },
        { id: 4, name: 'David', phone: '111-222-3333', email: 'david@mail.ru' },
    ]);
    function addContact(contact: ContactDataType) {
        contacts.value.push(contact);
      }
    
      function removeContact(id: number) {
        contacts.value = contacts.value.filter((contact) => contact.id !== id);
      }
      function updateContact(updatedContact: ContactDataType) {
        const index = contacts.value.findIndex((contact) => contact.id === updatedContact.id);
        if (index !== -1) {
          contacts.value[index] = updatedContact;
        }
      }
    return {
        contacts,
        addContact,
        removeContact,
        updateContact,
    }
});