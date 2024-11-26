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
  <section id="news" class="max-w-screen-xl flex flex-col justify-start items-center gap-20 news pt-10 md:py-32 relative">
    <div v-if="landingPageData?.newsLabel">
      <CommonFeatureLabel>
        <span class="text-sm">{{ landingPageData?.newsLabel }}</span>
      </CommonFeatureLabel>
    </div>
    
    <div
      class="news__list snap-x snap-mandatory flex overflow-x-auto gap-3 w-full hide-scroll-ui"      
    >
      <div
        class="snap-start rounded-xl min-w-[418px] h-[200px] overflow-hidden cursor-pointer group"
        v-for="(item, i) in landingPageData?.newsList"
        :key="`${item}-${i}`"
        @click="handleGoTo(item?.link)"
      >
        <div class="w-full h-full relative">
          <div class="absolute left-5 bottom-5 z-20 line-clamp-1 text-sm font-medium">
            {{ item?.title }}
          </div>
          <div class="absolute left-0 right-0 bottom-0 top-0 w-full h-full z-10 shade-overlay"></div>
          <SanityImage
            :asset-id="item?.image?.asset?._ref"
            class="w-full h-full object-cover object-center transition-all ease-in-out delay-150 group-hover:scale-110"
          />
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
  &::before {
            background: radial-gradient(37.74% 81.78% at 50% 73.44%, rgba(49, 58, 159, 0.2) 0%, rgba(49, 58, 159, 0) 100%);
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
            width: 1040px;
            z-index: 99;            
        }
}
</style>
