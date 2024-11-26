<script setup lang="ts">
import { storeToRefs } from 'pinia';
import numeral from 'numeral'
import { useUI } from '~/stores/ui'

const uiStore = useUI()
const { showBuyModal } = storeToRefs(uiStore)

const route = useRoute()

import { useLandingStore } from '~/stores/landing'
import { useDexScreener } from '~/stores/dexscreener'

const dexScreenerStore = useDexScreener()
const landingStore = useLandingStore()

const { landingPageData } = storeToRefs(landingStore)
const { dexScreenData } = storeToRefs(dexScreenerStore)

const pendingPage = ref<boolean>(false)

onMounted(async() => {
    pendingPage.value = true
    await landingStore.getSanityLandingPage()
    await dexScreenerStore.fetchDexScreenerPrices()
    pendingPage.value = false
})

const handleGoTo = (link: string) => {
    if (link) {
        window.open(link, '_blank')
    }
}

useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
})
</script>


<template>
    <div class="flex flex-col justify-start items-start w-full">
        <PageHeader />
        <slot />
        <div class="mt-auto w-full">
            <PageFooter />
        </div>
        <div class="z-50 fixed bottom-10 right-10">
            <PageControls />
        </div>
        <CommonModal
            v-if="showBuyModal"
            :showModal="showBuyModal"
            @emit-close-modal="showBuyModal = false"
        >
            <div class="white min-w-screen-lg min-w-96 bg-[#020013]/90 backdrop-blur-lg text-black p-8 text-sm flex flex-col gap-6 w-full rounded-md">
                
                <div v-if="dexScreenData?.baseToken?.address" class="flex justify-between items-center gap-2 border border-white/10 rounded-lg px-4 py-2 text-sm backdrop-blur-md text-white font-medium group-hover:border-white/10 group-hover:text-white/80">
                    <span class="leading-loosed">{{ truncateAddress(dexScreenData?.baseToken?.address, 18, 4) }}</span>
                    <CommonIconsClipBoard class="w-4 h-4 text-white"/>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex flex-col justify-center items-center border-2 border-white/10 rounded-lg p-3 gap-2">
                        <div class="text-xs uppercase font-medium text-white/60">Price USD</div>
                        <div class="font-semibold text-white">{{ dexScreenData?.priceUsd }}</div>
                    </div>
                    <div class="flex flex-col justify-center items-center border-2 border-white/10 rounded-lg p-3 gap-2">
                        <div class="text-xs uppercase font-medium text-white/60">Price </div>
                        <div class="font-semibold text-white">{{ dexScreenData?.priceNative }} Virtual</div>
                    </div>                    
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="flex flex-col justify-center items-center border-2 border-white/10 rounded-lg p-3 gap-2">
                        <div class="text-xs uppercase font-medium text-white/60">Liquidity</div>
                        <div class="font-semibold text-white">{{ numeral(dexScreenData?.liquidityUsd).format('0,0a') }}</div>
                    </div>
                    <div class="flex flex-col justify-center items-center border-2 border-white/10 rounded-lg p-3 gap-2">
                        <div class="text-xs uppercase font-medium text-white/60">FDV</div>
                        <div class="font-semibold text-white">{{ numeral(dexScreenData?.fdv).format('0,0a') }}</div>
                    </div>                    
                    <div class="flex flex-col justify-center items-center border-2 border-white/10 rounded-lg p-3 gap-2">
                        <div class="text-xs uppercase font-medium text-white/60">Mkt Cap</div>
                        <div class="font-semibold text-white">{{ numeral(dexScreenData?.marketCap).format('0,0a') }}</div>
                    </div>                    
                </div> 
                <div 
                    class="relative w-full" 
                    v-if="landingPageData?.exchangeList && landingPageData?.exchangeList.length > 0">
                    <div class="font-semibold text-sm text-white">Exchange / DEX</div>
                    <hr class="border-white/10 w-full my-2"/>
                    <div class="flex flex-col justify-between items-start text-white w-full">                
                        <div
                            v-for="(exchange, i) in landingPageData?.exchangeList" 
                            :asset-id="exchange?.image.asset?._ref"  
                            :alt="exchange.altText" 
                            :key="i"
                            @click="handleGoTo(exchange?.link)"
                            class="py-3 flex justify-between items-center w-full cursor-pointer">
                            {{ exchange?.title }}

                            <CommonIconsArrowRight class="text-white/80 w-4 h-4" />

                        </div>          
                    </div>            
                </div>
            </div>
        </CommonModal>
    </div>
  </template>
  