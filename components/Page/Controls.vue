<script lang="ts" setup>

const showVideo = ref<boolean>(false)

const handlePlay = () => {
    showVideo.value = !showVideo.value
}

</script>

<template>
    <div class="relative control">
        <div 
            v-if="showVideo"
            @click="showVideo = false"
            class="text-white/60 rounded-full h-5 w-5 mb-4 absolute right-0 -top-10 cursor-pointer hover:text-white/90 z-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
            </svg>
        </div>
        <div 
            class="control__item rounded-2xl transition-all ease-in-out delay-150 cursor-pointer bg-black/20 backdrop-blur-lg border-white/10 flex justify-between flex-col"
            :class="showVideo ? 'px-4  py-4 border-4' : 'px-8 py-6 border'"
            @click="handlePlay"
        >
            <div v-if="!showVideo" class="flex justify-start items-center gap-6">
                <div clas="relative">
                    <div class="w-12 h-12 overflow-hidden flex justify-center items-center relative">
                        <img src="/images/luna-profile.png" class="w-full h-full" />                                        
                    </div>                    
                </div>
                <div class="flex flex-col justify-start items-start gap-1">
                    <button class="text-white text-sm font-semibold p-gradient">Watch livestream</button>
                    <p class="p-white/50 text-[12px]">24/7 live</p>
                </div>
            </div>
            <div v-if="showVideo" class="h-[680px] overflow-hidden">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/F8IN0Msgc2A?si=Zhi0Q4adHKYYdjzv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .control {
        &__item:hover {
            background: linear-gradient(to bottom, rgba(255, 255, 255, .03) 0%, rgba(255, 255, 255, .06) 100%);
        }
    }
</style>