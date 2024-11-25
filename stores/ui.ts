import { defineStore } from 'pinia'

export const useUI = defineStore('UI', () => {

    const showBuyModal = ref<boolean>(false)

    return {
        showBuyModal,        
    }
})
