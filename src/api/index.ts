import { ContactDataType } from '@/types/index.ts';
import useMainStore from '@/store/index.ts';

export async function fetchContacts(): Promise<ContactDataType> {
    const store = useMainStore();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedContacts = JSON.parse(localStorage.getItem('contacts'));
                if (!fetchedContacts) {
                    fetchedContacts = store.contacts;
                    localStorage.setItem('contacts', JSON.stringify(store.contacts));
                }
                resolve(fetchedContacts);
            } catch (err) {
                console.error(import.meta.url + ':fetchedContacts  => ', err);
                reject(err);
            }
        }, 1000);
    });
}
export function createContact(contactData: ContactDataType): Promise<ContactDataType> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const fetchedContacts = JSON.parse(localStorage.getItem('contacts'));
                if (Array.isArray(fetchedContacts)) {
                    fetchedContacts.push(contactData);
                    localStorage.setItem('contacts', JSON.stringify(fetchedContacts));
                } else {
                    localStorage.setItem('contacts', JSON.stringify([contactData]));
                }
                resolve({...contactData});
            }
            catch (err) {
                console.error(import.meta.url + ':createContact  => ', err);
                reject(err);
            }
            }, 1000)
    })
}
export function deleteContactApi(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedContacts = JSON.parse(localStorage.getItem('contacts'));
                if (Array.isArray(fetchedContacts)) {
                    fetchedContacts = fetchedContacts.filter((c: ContactDataType) => c.id !== id);
                    localStorage.setItem('contacts', JSON.stringify(fetchedContacts));
                    resolve(id);
                }
            }
            catch (err) {
                console.error(import.meta.url + ':deleteContact  => ', err);
                reject(err);
            }
        }, 1000)
    })
}
export function editContactApi(contactData: ContactDataType): Promise<ContactDataType> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedContacts = JSON.parse(localStorage.getItem('contacts'));
                fetchedContacts = fetchedContacts.map((c: ContactDataType) => {
                if(c.id == contactData.id) {
                    return { ...c, name: contactData.name, phone: contactData.phone };
                } else {
                    return c;
                }
                });
                localStorage.setItem('contacts', JSON.stringify(fetchedContacts));  
                resolve(contactData);
            }
            catch (err) {
                console.error(import.meta.url + ':editContact  => ', err);
                reject(err);
            }
        }, 1000)
    })
}