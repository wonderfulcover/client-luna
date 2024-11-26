<script lang="ts" setup>
import { useLandingStore } from '~/stores/landing'

const landingStore = useLandingStore()
const { landingPageData } = storeToRefs(landingStore)

const handleGoTo = (link: string) => {
    if (link) {
        window.open(link, '_blank')
    }
}

</script>

<template>
    <section id="exchange" class="max-w-screen-xl relative flex flex-col justify-start items-center gap-10 py-10 md:py-32 exchange" >
        <div v-if="landingPageData?.exchangeLabel">
            <CommonFeatureLabel>
                <span class="text-sm">{{ landingPageData?.exchangeLabel }}</span>
            </CommonFeatureLabel>
        </div>        
        <div 
            class="relative" 
            v-if="landingPageData?.exchangeList && landingPageData?.exchangeList.length > 0">
            <div class="px-5 2xl:px-0 grid grid-cols-1 md:grid-cols-4 card-grid w-full h-full gap-10 md:gap-20 justify-center items-center">                
                <SanityImage 
                    v-for="(exchange, i) in landingPageData?.exchangeList" 
                    :asset-id="exchange?.image.asset?._ref"  
                    :alt="exchange.altText" 
                    :key="i"
                    @click="handleGoTo(exchange?.link)"
                    class="w-48 cursor-pointer opacity-60 hover:opacity-100 transition-all ease-in-out duration-150"/>                
            </div>            
        </div>
    </section> 
</template>

<style lang="scss" scoped>

.exchange {
    &::before {
        background: radial-gradient(37.74% 81.78% at 50% 26.56%,rgba(148,101,255,.06) 0%,rgba(3,0,20,0) 100%);
        content: "";
        display: block;
        height: 400px;
        left: 50%;
        pointer-events: none;
        position: absolute;
        top: 0;
        transform: translate(-50%);
        width: 1440px;
        z-index: 1;
    } 
}

</style>

