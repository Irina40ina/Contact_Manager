<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
// ################################## PROPS ###########################################
const props = withDefaults(defineProps<{
    isShow: boolean;
}>(), {
    isShow: false,
});
// ################################## EMITS ###########################################
const emits = defineEmits<{
    (e: 'close'): void,
}>();
</script>

<template>
    <transition name="dialog-fade">
        <div v-if="props.isShow" class="dialog__overlay" @click="emits('close')">
            <div class="dialog__content" @click.stop>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.dialog__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    z-index: 1000;
}

.dialog__content {
    position: relative;
    min-width: 200px;
    min-height: 80px;
    width: max-content;
    height: max-content;
    background-color: var(--color-bg-main);
    box-shadow: var(--shadow);
    overflow: auto;
    border-radius: 5px;
}

.dialog-fade-enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.dialog-fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

.dialog-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.dialog-fade-leave-from {
    opacity: 1;
    transform: scale(1);
}

.dialog-fade-leave-to {
    opacity: 0;
    transform: scale(0);
}
.card-container {
        width: 300px;
        height: 300px;
        background-color: white;
    }
</style>