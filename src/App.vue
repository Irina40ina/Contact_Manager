<script setup lang="ts">
import { ref, Ref, onMounted, computed } from 'vue';
import ContactList from '@/components/ContactList.vue';
import ContactCard from '@/components/ContactCard.vue';
import ContactForm from '@/components/ContactForm.vue';
import SearchBar from '@/components/SearchBar.vue';
import dialogWindow from '@/components/UI/dialogWindow.vue';
import { ContactDataType } from '@/types/index.ts';
import { fetchContacts, deleteContactApi } from '@/api/index.ts';
import useMainStore from '@/store/index.ts';
const store = useMainStore();
// ################################## DATA ###########################################
const isShowContactCard = ref(false);
const isShowContactForm = ref(false);
const selectedContact: Ref<ContactDataType> = ref({
  id: null,
  name: '',
  phone: '',
  email: '',
});
const searchQuery = ref('');

// ################################## COMPUTED ###########################################
const filteredContacts = computed(() => {
  return store.contacts
  .filter((contact: ContactDataType) =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  .slice() 
  .reverse() 
});
// ################################## METHODS ###########################################
function searchContacts(query: string) {
  try {
    searchQuery.value = query;
  } catch (err) {
    console.error(`App=>searchContacts=> ${err}`)
  }
};
function openContact(data: ContactDataType) {
  try {
    isShowContactCard.value = true;
    selectedContact.value = data;
  } catch (err) {
    console.error(`App=>openContact=> ${err}`)
  }
}
function openAddForm() {
  try {
    selectedContact.value = null;
    isShowContactForm.value = true;
  } catch (err) {
    console.error(`App=>openAddForm=> ${err}`)
  }
}
function openEditForm() {
  isShowContactForm.value = true;
}
function closeFormAndUpdateSelected(newDataContact: ContactDataType) {
  try {
    isShowContactForm.value = false;
    selectedContact.value = {...newDataContact};
  } catch (err) {
    console.error(`App=>closeFormAndUpdateSelected=> ${err}`)
  }
}
async function deleteContact() {
  try {
    const deletedContactId = await deleteContactApi(selectedContact.value.id);
    if(deletedContactId) {
      store.removeContact(deletedContactId);
    }
  } catch (err) {
    console.error(`App=>deleteContact=> ${err}`)
  } finally {
    selectedContact.value = { id: null, name: '', phone: '' };
    isShowContactCard.value = false;
  }
}
// ################################## HOOKS ###########################################
onMounted(async () => {
  try {
    const fetchedContacts = await fetchContacts();
    store.contacts = fetchedContacts;
  } catch (err) {
    console.error(`App=>onMounted=> ${err}`)
  }
})
</script>

<template>
  <!-- Диалоговое окно для просмотра контакта -->
  <dialogWindow 
  :is-show="isShowContactCard"
  @close="isShowContactCard=false"
  >
    <ContactCard
    :opened-contact="selectedContact"
    @edit-contact="openEditForm"
    @delete-contact="deleteContact"
    ></ContactCard>
  </dialogWindow>
  <!-- Диалоговое окно для создания контакта -->
  <dialogWindow 
  :is-show="isShowContactForm"
  @close="isShowContactForm=false"
  >
    <ContactForm 
    :contact="selectedContact"
    @contact-added="isShowContactForm=false"
    @contact-updated="closeFormAndUpdateSelected"
    ></ContactForm>
  </dialogWindow>

  <div id="app">
    <header>
      <h1 class="logo">Contact Manager</h1>
    </header>
    <SearchBar @search="searchContacts"/>
    <ContactList 
    :contacts="filteredContacts"
    @select-contact="openContact"
    @create-contact="openAddForm"
    />
  </div>

</template>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
header {
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.logo {
   font-size: 2rem;
   font-weight: 700;
   color: var(--bacic-color-fg);
   letter-spacing: 0.05em;
   text-transform: uppercase;
   text-shadow: var(--text-shadow);
   cursor: none;
   transition: color 0.3s ease;
   margin: 1rem;
}
.logo:hover {
   color: var(--bright-color-fg); 
}
</style>