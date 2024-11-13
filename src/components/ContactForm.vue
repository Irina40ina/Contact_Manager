<script setup lang="ts">
import { ref, type Ref, watch, computed, defineEmits} from 'vue';
import { ContactDataType } from '@/types/index.ts';
import useMainStore from '@/store/index.ts';
import { createContact, editContactApi } from '@/api/index.ts';
import { isValidName, isValidPhone, isValidEmail } from '@/utils/validation.ts';
const store = useMainStore();
// ################################## DATA ###########################################
const formData = ref<ContactDataType>({
  id: null,
  name: '',
  phone: '',
  email: '',
});
const isEditMode = ref(false);
const isNameValid = ref(true);
const isPhoneValid = ref(true);
const isEmailValid = ref(true);
// ################################## PROPS ###########################################
const props = defineProps<{
  contact?: ContactDataType;
}>();
// ################################## EMITS ###########################################
const emits = defineEmits<{
  (e: 'contactAdded' | 'contactUpdated', contact?: ContactDataType): void;
}>();
// ################################## WATCH ###########################################
watch(() => props.contact, (newContact) => {
  console.log('[Watch -> props.contact]', newContact);
  
  try {
    if (newContact) {
      formData.value = { ...newContact };
      isEditMode.value = true;
    } else {
      // resetForm();
      isEditMode.value = false;
    }
  } catch (err) {
    console.error(`ContactForm=>watch=>props.contact ${err}`)
  }
},
{ immediate: true });

// ################################## COMPUTE ###########################################
const isFormValid = computed(() => isNameValid.value && isPhoneValid.value && isEmailValid.value);
// ################################## METHODS ###########################################
async function submitForm() {
  try {
    if (isEditMode.value && formData.value.id !== null) {
      console.log(formData.value)
      // Режим редактирования
      const updatedContact = await editContactApi(formData.value);
      store.updateContact(updatedContact); 
      emits('contactUpdated', updatedContact);
    } else {
      // Режим добавления
      formData.value.id = Date.now();
      const newContact = await createContact(formData.value);
      store.addContact(newContact);
      emits('contactAdded');
    }
    resetForm();
  } catch (err) {
    console.error(`ContactForm=>submitForm=> ${err}`)
  }
}

function resetForm() {
  try {
    console.log('resetForm');
    
    formData.value = { id: null, name: '', phone: '', email: '' };
    isEditMode.value = false;
  } catch (err) {
    console.error(`ContactForm=>resetForm=> ${err}`)
  }
}

function updateInputName(event: Event) {
  const target = event.target as HTMLInputElement; 
  isNameValid.value = isValidName(target.value);
  formData.value.name = target.value;
}

function updateInputEmail(event: Event) {
  const target = event.target as HTMLInputElement; 
  isEmailValid.value = isValidEmail(target.value);
  formData.value.email = target.value;
}

function updateInputPhone(event: Event) {
  const target = event.target as HTMLInputElement; 
  isPhoneValid.value = isValidPhone(target.value);
  formData.value.phone = target.value;
}
</script>

<template>
  <div class="contact-form-container">
    <h2 class="contact-form-tytle">
      {{ isEditMode ? 'Редактировать контакт' : 'Добавить контакт' }}
    </h2>
    <form @submit.prevent="submitForm">
      <label class="form-label">
        Имя:
        <input @input="updateInputName" :value="formData.name" class="form-input" required />
        <span v-show="!isNameValid" class="error">Имя должно содержать минимум 2 символа</span>
      </label>
      <label class="form-label">
        Телефон:
        <input @input="updateInputPhone" :value="formData.phone" v-imask="{ mask: '+{7} (000) 000-00-00' }" class="form-input" required />
        <span v-show="!isPhoneValid" class="error">Некорректный номер телефона</span>
      </label>
      <label class="form-label">
        e-mail:
        <input @input="updateInputEmail" :value="formData.email"  class="form-input" required />
        <span v-show="!isEmailValid" class="error">Некорректный e-mail</span>
      </label>
      <button type="submit" class="submit-button" :disabled="!isFormValid">
        {{ isEditMode ? 'Сохранить' : 'Добавить' }}
      </button>
    </form>
  </div>
</template>
  
<style scoped>
  .contact-form-container {
  min-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  background-color: var(--list-bc);
}

.contact-form-title {
  text-align: center;
  margin-bottom: 20px;
  color: var(--bacic-color-fg);
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: var(--second-color-fg);
  font-weight: bold;
}

.form-input {
  width: 93%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.error {
  color: var(--error-color);
}
.submit-button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: var(--btn-bg);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--btn-bg-hover);
}
</style>