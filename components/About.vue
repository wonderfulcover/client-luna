<script lang="ts" setup>
import { useLandingStore } from '~/stores/landing'
import { useDexScreener } from '~/stores/dexscreener';
import TypeEffect from './Common/TypeEffect.vue';

const env = useRuntimeConfig()
const { TERMINAL_URL, WHITEPAPER_URL } = env.public;

const landingStore = useLandingStore()
const { landingPageData } = storeToRefs(landingStore)

const dexscreenerStore = useDexScreener()
const { dexScreenData } = storeToRefs(dexscreenerStore)

const handleGoTo = (link: string) => {
    if (link) {
        window.open(link, '_blank')
    }
}

</script>

<template>    
    <section id="about" class="about max-w-screen-xl utility flex flex-col justify-start items-center gap-16 py-10 md:py-24" >
        <div>
            <CommonFeatureLabel class="about__label">
                <span class="text-sm">{{ landingPageData?.aboutLabel }}</span>
            </CommonFeatureLabel>
            <div v-if="landingPageData?.aboutSubTitle" class="px-5 2xl:px-0 p-gradient leading-relaxed max-w-md text-center opacity-70 mt-10">
                {{ landingPageData?.aboutSubTitle }}
            </div>
        </div> 
        <!-- <h1 v-if="landingPageData?.aboutTitle" class="text-left text-[63px] font-bold leading-tight text-gradient">{{ landingPageData?.aboutTitle }}</h1>                    -->
        <div class="about__container flex justify-between items-center gap-20 relative w-full">            
            <div class="flex justify-end items-center flex-col mx-auto hero__header max-w-4xl absolute w-full left-0 right-0 z-50 gap-3">
                <!-- <div>
                    <CommonPost
                        class="mt-20" 
                        :name="'Luna'"
                        :username="'@luna_virtuals'"
                        :content="'The first ever virtual world on the blockchain'"
                        :chart-count="756"
                        :retweet-count="920"
                        :like-count="230"
                        :post-count="465"
                    />
                </div> -->
                <div class="relative flex w-full justify-center items-center mt-40">                    
                    <Sphere />
                </div>
                <div class="flex justify-center flex-col items-center gap-10">                    
                    <TypeEffect class="text-center px-5 md:px-0"/>
                    <div class="flex justify-center items-center gap-3">
                        <CommonButton @click="handleGoTo(TERMINAL_URL)">Learn more</CommonButton>
                        <CommonButton class="bg-white/10 backdrop-blur-2xl text-white" @click="handleGoTo(WHITEPAPER_URL)">Whitepaper</CommonButton>
                    </div>
                    
                </div>                
            </div>
            <div class="absolute left-0 top-0 right-0 z-40 h-[400px] w-full flex justify-start items-start">
                <div class="animation-wrapper overflow-hidden mx-auto w-[320px] left-0 right-0">
                    <div class="particle particle-1"></div>
                    <div class="particle particle-2"></div>
                    <div class="particle particle-3"></div>
                    <div class="particle particle-4"></div>
                </div>
            </div>            
            <img class="w-full object-cover" src="/images/mesh.png" />          
        </div>        
    </section> 
</template>