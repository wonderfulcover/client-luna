k<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUI } from '~/stores/ui'

const uiStore = useUI()
const { showBuyModal } = storeToRefs(uiStore)

const isHeaderVisible = ref(true)
let lastScrollPosition = 0

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 150) {
    isHeaderVisible.value = false
  } else {
    isHeaderVisible.value = true
  }
  lastScrollPosition = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleGoTo = (link: string) => {
    if (link) {
        window.open(link, '_blank')
    }
}
</script>

<template>
    <div
        class="w-full fixed z-[99999999] header transition-transform duration-500 ease-in-out"
        :class="isHeaderVisible ? 'translate-y-0' : '-translate-y-full'"
    >
        <div class="w-full flex justify-between items-center max-w-screen-xl mx-auto py-5 px-5 2xl:px-0">
            <div>
                <NuxtLink to="/" class="text-3xl font-bold text-gradient">LUNA</NuxtLink>
            </div>
            <div class="hidden border rounded-full border-white/5 px-6 py-3 md:flex justify-center items-center gap-8 text-sm bg-white/[1%] backdrop-blur-xl">
                <NuxtLink @click="scrollToSection('exchange')" class="cursor-pointer">Exchange/DEX</NuxtLink>                
                <NuxtLink @click="scrollToSection('about')" class="cursor-pointer">About</NuxtLink>
                <NuxtLink @click="scrollToSection('utility')" class="cursor-pointer">Utilities</NuxtLink>
                <NuxtLink @click="scrollToSection('news')" class="cursor-pointer">News</NuxtLink>  
                <NuxtLink @click="handleGoTo('https://whitepaper.virtuals.io/')" class="cursor-pointer">Whitepaper</NuxtLink>
            </div>
            <div class="flex justify-end items-center gap-6">  
                <CommonSocialsDiscord class=" fill-white/80 stroke-white w-8 h-8 cursor-pointer hover:fill-white/100" />
                <CommonButton class="cursor-pointer"  @click="showBuyModal = true">Buy LUNA</CommonButton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.header {
  will-change: transform;
}

</style>