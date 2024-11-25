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
  <section id="news" class="max-w-screen-xl utility flex flex-col justify-start items-center gap-20 news py-32">
    <!-- News Label -->
    <div v-if="landingPageData?.newsLabel">
      <CommonFeatureLabel>
        <span class="text-sm">{{ landingPageData?.newsLabel }}</span>
      </CommonFeatureLabel>
    </div>
    
    <div
      class="news__list flex overflow-x-auto snap-x snap-mandatory scroll-px-6 gap-3 w-full hide-scroll-ui"
      style="scroll-behavior: smooth"
    >
      <div
        class="snap-start rounded-xl min-w-[418px] h-[200px] overflow-hidden cursor-pointer group"
        v-for="(item, i) in landingPageData?.newsList"
        :key="`${item}-${i}`"
        @click="handleGoTo(item?.link)"
      >
      
      <div class="w-full h-full relative">
            <div class="absolute left-5 bottom-5 z-20 line-clamp-1 text-sm font-medium">{{ item?.title }}</div>  
            <div class="absolute left-0 right-0 bottom-0 top-0 w-full h-full z-10 shade-overlay"></div>
            <SanityImage :asset-id="item?.image?.asset?._ref" class="w-full h-full object-cover object-center transition-all ease-in-out delay-150 group-hover:scale-110" />
        </div>        
      </div>      
    </div>
  </section>
</template>

<style lang="scss" scoped>
.scroll-px-6 {
  scroll-padding-left: 1.5rem;
}

.news {
    &__list {
        // mask-image: linear-gradient(to right, rgba(2, 0, 18, 1.0) 70%, transparent 100%);
    }
}
</style>
