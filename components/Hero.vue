<script lang="ts" setup>
import numeral from 'numeral'
import { useLandingStore } from '~/stores/landing'
import { useDexScreener } from '~/stores/dexscreener'

const landingStore = useLandingStore()
const dexscreenerStore = useDexScreener()

const { landingPageData } = storeToRefs(landingStore)
const { dexScreenData } = storeToRefs(dexscreenerStore)

const colorParticle = ref<string>('#ff0000')
const showModal = ref<boolean>(false)

defineProps({
  colorParticle: {
    type: String,
    default: '#ff0000',
  },
})

const handleShowModal = () => {
    showModal.value = !showModal.value
}

watch(
  () => dexScreenData?.value?.priceChange24h?.isPositive,
  (isPositive) => {
    colorParticle.value = isPositive ? 'white' : 'white'
    if (!import.meta.env.SSR) {
      document.documentElement.style.setProperty('--color-particle', colorParticle.value)
    }
  },
  { immediate: true }
)

onMounted(() => {
    if (!import.meta.env.SSR) {
        document.documentElement.style.setProperty('--color-particle', colorParticle.value)
    }    
})

</script>

<template>    
    <div class="flex flex-col justify-start items-center hero p-[1px] bg-gradient-to-t from-white/20 to-transparent rounded-3xl max-w-screen-2xl overflow-hidden group">
        <div class="bg-[#020013] overflow-hidden rounded-3xl">
            <div 
                class="overflow-hidden relative hero__luna bg-[#020013] pt-40 flex flex-col justify-start items-start"
                :class="`${!dexScreenData?.priceChange24h.isPositive ? 'negative' : ''}`">                
                <div class="flex justify-center items-center flex-col mx-auto py-20 hero__header">
                    <h1 v-if="landingPageData?.heroTitle" class="text-[82px] font-semibold leading-tight text-gradient">{{ landingPageData?.heroTitle }}</h1>
                    <h2 v-if="landingPageData?.heroSubTitle" class="p-gradient">{{ landingPageData?.heroSubTitle }}</h2>
                </div>

                <div class="absolute bottom-[28%] left-0 right-0 flex justify-center items-center z-20 transition-all ease-in-out duration-150 group-hover:scale-105 cursor-pointer" >
                    <div 
                        @click="handleShowModal"
                        class="rounded-full border border-white/50 bg-black/20 p-2">
                        <div class="rounded-full border border-white/20 bg-white/5 flex justify-center items-center w-20 h-20">
                            <CommonIconsPlay class="w-5 h-5 text-white group-hover:scale-150 ease-in-out transition-all duration-200" />
                        </div>
                    </div>
                </div>
                <!-- <CommonPost
                    class="absolute bottom-80 left-[10%]" 
                    :name="'Luna'"
                    :username="'@luna_virtuals'"
                    :content="'The first ever virtual world on the blockchain'"
                    :chart-count="756"
                    :retweet-count="920"
                    :like-count="230"
                    :post-count="465"
                />
                <CommonPost
                    class="absolute bottom-52 right-[10%]" 
                    :name="'Luna'"
                    :username="'@luna_virtuals'"
                    :content="'The first ever virtual world on the blockchain'"
                    :chart-count="756"
                    :retweet-count="920"
                    :like-count="230"
                    :post-count="465"
                /> -->
                <div class="absolute bottom-20 flex justify-center items-center gap-3 left-0 right-0 z-[9999999]">
                    <div class="border border-white/10 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-md text-white/50 group-hover:border-white/10 group-hover:text-white/80">Price: {{ dexScreenData?.priceUsd }}</div>
                    <div class="border border-white/10 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-md text-white/50 group-hover:border-white/10 group-hover:text-white/80">Market Cap: {{ numeral(dexScreenData?.marketCap).format('0,0a') }}</div>
                    <div class="border border-white/10 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-md text-white/50  group-hover:border-white/10 group-hover:text-white/80 flex justify-start items-center gap-1">
                        1 Day Chg: 
                        <CommonIconsArrowDown v-if="!dexScreenData?.priceChange24h.isPositive" class="w-5 h-5 text-white/60" />
                        <CommonIconsArrowUp v-else class="w-5 h-5" />
                        {{ dexScreenData?.priceChange24h?.percent }}%
                    </div>
                    <div class="border border-white/10 rounded-lg px-4 py-2 text-sm backdrop-blur-md text-white/50 font-medium group-hover:border-white/10 group-hover:text-white/80">24h Vol: {{ numeral(dexScreenData?.volumeChange24h.volume).format('0,0a') }}</div>
                    <div v-if="dexScreenData?.baseToken?.address" class="flex justify-center items-center gap-2 border border-white/10 rounded-lg px-4 py-2 text-sm backdrop-blur-md text-white/50 font-medium group-hover:border-white/10 group-hover:text-white/80">
                        <span class="leading-loosed">{{ truncateAddress(dexScreenData?.baseToken?.address, 8, 4) }}</span>
                        <CommonIconsClipBoard class="w-4 h-4 text-white/40"/>
                    </div>
                </div>  
                
                <img :src="`${ dexScreenData?.priceChange24h.isPositive ? '/images/luna-hero-tranparent-green.png' : '/images/luna-hero-tranparent-laser.png'}`" class="w-full h-full opacity-95" />
                
                <div class="animation-wrapper overflow-hidden">
                    <div class="particle particle-2"></div>
                    <div class="particle particle-3"></div>
                    <div class="particle particle-4"></div>
                </div>
            </div>
        </div>
    </div>  
    <CommonModal
        v-if="showModal"
        :showModal="showModal"
        @emitCloseModal="showModal = false;"
    >
        <div>
            <video
                class="w-full h-full"
                controls
                autoplay
                src="/videos/luna-002.mp4" />
        </div>
    </CommonModal>
</template>

<style lang="scss" scoped>

.hero {
    &::before {
        background: radial-gradient(37.74% 81.78% at 50% 26.56%,rgba(148,101,255,.1) 0%,rgba(3,0,20,0) 100%);
        content: "";
        display: block;
        height: 900px;
        left: 50%;
        pointer-events: none;
        position: absolute;
        top: -173px;
        transform: translate(-50%);
        width: 1440px;
        z-index: 1;
    }    

    &__luna {
        &::before {
            background: radial-gradient(37.74% 81.78% at 50% 73.44%, rgba(49, 58, 159, 0.3) 0%, rgba(49, 58, 159, 0) 100%);
            // background: radial-gradient(37.74% 81.78% at 50% 73.44%, rgba(0, 154, 11, 0.3) 0%, rgba(0, 154, 11, 0) 100%);
            // background: radial-gradient(37.74% 81.78% at 50% 73.44%, rgba(49, 58, 159, 0.3) 0%, rgba(49, 58, 159, 0) 100%);
            content: "";
            display: block;
            height: 400px;
            left: 50%;
            pointer-events: none;
            position: absolute;
            bottom: 0;
            transform: translate(-50%);
            width: 1440px;
            z-index: 99;            
        }
    }

    &__luna {
        &.negative::before {
            background: radial-gradient(37.74% 81.78% at 50% 73.44%, rgba(211, 0, 0, 0.3) 0%, rgba(211, 0, 0, 0) 100%);            
        }
    }
    
}


</style>