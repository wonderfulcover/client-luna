<script lang="ts" setup>
import { useLandingStore } from '~/stores/landing'

const landingStore = useLandingStore()
const { landingPageData } = storeToRefs(landingStore)

</script>

<template>
    <section class=" max-w-screen-xl utility flex flex-col justify-start items-center gap-20" >
        <div v-if="landingPageData?.integrationLabel">
            <CommonFeatureLabel>
                <span class="text-sm">{{ landingPageData?.integrationLabel }}</span>
            </CommonFeatureLabel>
        </div>
        
        <div class="flex flex-col justify-center items-center gap-8">
            <div class="flex justify-start items-start flex-col mx-auto hero__header  max-w-xl">
                <h1 v-if="landingPageData?.integrationTitle" class="text-center text-[52px] font-semibold leading-snug text-gradient">{{ landingPageData?.integrationTitle }}</h1>            
                <p v-if="landingPageData?.integrationSubTitle" class="p-gradient mt-5 text-center">
                    {{ landingPageData?.integrationSubTitle }}
                </p>
            </div>
            <div v-if="landingPageData?.integrationList && landingPageData?.integrationList.length > 0" class="flex justify-start items-center gap-10">
                <div 
                    v-for="(item, i) in landingPageData?.integrationList" 
                    :key="i"
                    class="bg-white/10 rounded-xl w-[60px] h-[60px] overflow-hidden">
                    <SanityImage :asset-id="item?.image?.asset?._ref" class="w-full h-full mx-auto scale-110 object-cover object-center" />
                </div>                
            </div>
        </div>
        
    </section> 
</template>