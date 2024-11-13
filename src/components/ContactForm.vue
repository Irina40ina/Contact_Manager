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
// watch(formData, (newValue) => {
//   console.log('[Watch -> formData]', newValue);
//   try {
//     isNameValid.value = isValidName(formData.value.name);
//     isPhoneValid.value = isValidPhone(formData.value.phone);
//     isEmailValid.value = isValidEmail(formData.value.email);
//   } catch (err) {
//     console.error(`ContactForm=>watch=>formData ${err}`)
//   }
// }, {deep: true});
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
  // isNameValid.value = isValidName(target.value);
  formData.value.name = target.value;
}

function updateInputEmail(event: Event) {
  const target = event.target as HTMLInputElement; 
  formData.value.email = target.value;
  console.log(formData.value);
}

function updateInputPhone(event: Event) {
  const target = event.target as HTMLInputElement; 
  formData.value.phone = target.value;
  console.log(formData.value);
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
        <span class="error">Имя должно содержать минимум 2 символа</span>
      </label>
      <label class="form-label">
        Телефон:
        <input @input="updateInputPhone" v-imask="{ mask: '+{7} (000) 000-00-00' }" class="form-input" required />
        <span v-show="!isEmailValid" class="error">Некорректный номер телефона</span>
      </label>
      <label class="form-label">
        e-mail:
        <input @input="updateInputEmail" class="form-input" required />
        <span v-show="!isPhoneValid" class="error">Некорректный e-mail</span>
      </label>
      <button type="submit" class="submit-button" :disabled="!isFormValid">
        {{ isEditMode ? 'Сохранить' : 'Добавить' }}
      </button>
    </form>
  </div>
</template>
  
<style scoped>
  .contact-form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.contact-form-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: #555;
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
  color: red;
}
.submit-button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>