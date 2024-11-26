<script lang="ts" setup>

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
    <div class="w-full px-5 2xl:px-0 gap-5 flex flex-wrap justify-center md:justify-between items-center max-w-screen-xl mx-auto py-24 border-y border-white/5">        
        <div>
            <NuxtLink to="/" class="text-3xl font-bold text-gradient">LUNA</NuxtLink>
        </div>
        <div class="hidden px-6 py-3 md:flex justify-center items-center gap-8 text-sm bg-white/[1%] backdrop-blur-xl">
            <NuxtLink @click="scrollToSection('exchange')" class="cursor-pointer">Exchange/DEX</NuxtLink>                
            <NuxtLink @click="scrollToSection('about')" class="cursor-pointer">About</NuxtLink>
            <NuxtLink @click="scrollToSection('utility')" class="cursor-pointer">Utilities</NuxtLink>
            <NuxtLink @click="scrollToSection('news')" class="cursor-pointer">News</NuxtLink>
            <NuxtLink @click="handleGoTo('https://whitepaper.virtuals.io/')" class="cursor-pointer">Whitepaper</NuxtLink>               
        </div>
        <div class="flex justify-end items-center gap-6">              
            <CommonButton class="cursor-pointer"  @click="scrollToSection('exchange')">Buy Luna</CommonButton>
        </div>        
    </div>
    <div class="w-full flex justify-center flex-col md:flex-row md:justify-between items-center max-w-screen-xl mx-auto py-10 gap-10">        
        <div class="text-[12px] p-gradient flex justify-start items-center gap-2 px-5 2xl:px-0">
            <span class="text-center md:text-left">Community built. Not Financial Advice. 
            Powered by Virtuals Protocol.</span>
        </div>
        <div class="flex justify-end items-center gap-6 px-5 2xl:px-0">
            <CommonSocialsDiscord class=" fill-white/80 stroke-white w-8 h-8 cursor-pointer hover:fill-white/100" />
            <CommonSocialsTelegram class="fill-white/80 stroke-white w-8 h-8 cursor-pointer hover:fill-white/100" />
        </div>
    </div>
</template>