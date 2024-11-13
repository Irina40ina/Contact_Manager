import { mount } from "@vue/test-utils";


describe("ContactForm.vue", () => { // Группа тестов для компонента MyComponent

    it("Проверка рендеринга", (ctx) => { // Тест, проверяющий правильность рендеринга
        console.log(ctx.task.name); // Логирует имя текущей задачи (не используется в тесте напрямую)
        const wrapper = mount(todoApp); // Монтируем компонент todoApp
        expect(wrapper.text()).toContain("Hello, World!"); // Проверяем, что текст компонента содержит "Hello, World!"
    });
    it("Props", () => {
        const wrapper = mount(Password, {
            props: {
                minLength: 10
            },
            data() {
                return {
                    password: 'short'
                }
            }
        });
        expect(wrapper.).toContain('Password must be at least 10 characters')
    })
});