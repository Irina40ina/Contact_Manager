export const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const patternPhone = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/; 
export const patternName = /^[a-zA-Zа-яА-ЯёЁ\s]{3,50}$/;


function isValidByPattern(input: string, pattern: RegExp, fieldName?: string) {
    try {
        let isValid = true;
        if(input && typeof input === 'string') {
           isValid = pattern.test(input);
        } else {
            isValid = false;
        }
        return isValid;
    } catch (err) {
        console.error(`Ошибка при валидации ${fieldName}:`, err);
        throw err;
    }
}

// Валидация email
export function isValidEmail(email: string): boolean {
    return isValidByPattern(email, patternEmail, 'email');
}

// Валидация номера телефона
export function isValidPhone(phone: string): boolean {
    return isValidByPattern(phone, patternPhone, 'phone');
}

// Валидация имени
export function isValidName(name: string): boolean {
    return isValidByPattern(name, patternName, 'name');
}