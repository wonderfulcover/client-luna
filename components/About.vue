<script lang="ts" setup>
import { useLandingStore } from '~/stores/landing'
import { useDexScreener } from '~/stores/dexscreener';
import TypeEffect from './Common/TypeEffect.vue';

const landingStore = useLandingStore()
const { landingPageData } = storeToRefs(landingStore)

const dexscreenerStore = useDexScreener()
const { dexScreenData } = storeToRefs(dexscreenerStore)

</script>

<template>    
    <section id="about" class="about max-w-screen-xl utility flex flex-col justify-start items-center gap-16 py-24" >
        <div>
            <CommonFeatureLabel class="about__label">
                <span class="text-sm">{{ landingPageData?.aboutLabel }}</span>
            </CommonFeatureLabel>
            <div v-if="landingPageData?.aboutSubTitle" class="p-gradient leading-relaxed max-w-md text-center opacity-70 mt-10">
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
                    <TypeEffect />
                    <CommonButton>Learn more</CommonButton>
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
            <img src="/images/mesh.png" />          
        </div>        
    </section> 
</template>