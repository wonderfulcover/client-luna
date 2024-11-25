<script lang="ts" setup>

interface IModal {
    showModal: boolean,
}

const emits = defineEmits(['emitCloseModal'])

const props = defineProps<IModal>()

</script>

<template>
    <div v-if="props.showModal" class="fixed left-0 right-0 top-0 bottom-0 bg-black/5 backdrop-blur-lg z-[9999999] flex justify-center items-center">
        <div class="max-w-screen-xl m-auto relative">
            <div 
                @click="emits('emitCloseModal')"
                class="text-white/60 rounded-full h-5 w-5 mb-4 absolute right-0 -top-10 cursor-pointer hover:text-white/90 z-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>

            </div>
            <div class="border-4 border-white/50 rounded-xl overflow-hidden p-2">            
                <slot />
            </div>
        </div>
    </div>
</template>