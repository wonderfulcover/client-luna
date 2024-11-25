<script lang="ts" setup>

interface Post {
    name: string;
    username: string;
    content: string;
    postCount: number;
    retweetCount: number;
    likeCount: number;
    chartCount: number;
}

const props = defineProps<Post>();

</script>

<template>
    <div class="border max-w-96 border-white/10 rounded-lg absolute flex justify-center gap-3 p-6 bg-black/20 text-white font-semibold backdrop-blur-lg">
        <img src="/images/luna-profile.png" class="w-10 h-10 rounded-full object-cover object-center" />
        <div class="flex flex-col justify-start items-start gap-3">
            <div class="flex justify-start items-center gap-2">
                <div class="text-white">{{ props.name }}</div>
                <CommonIconsVerified class="w-6 h-6 fill-blue-500" />
                <div class="text-white/60">{{ props.username }}</div>
            </div>
            <p class="text-white text-sm">
                {{ props.content }}
            </p>
            <div class="flex justify-start items-center gap-4">
                <div class="flex justify-start items-center gap-1">
                    <CommonIconsPost class="w-5 h-5 fill-white/50" />
                    <span class="text-white/50 text-sm">{{ props.postCount }}</span>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <CommonIconsRetweet class="w-5 h-5 fill-white/50" />
                    <span class="text-white/50 text-sm">{{ props.retweetCount }}</span>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <CommonIconsLike class="w-5 h-5 fill-white/50" />
                    <span class="text-white/50 text-sm">{{ props.likeCount }}</span>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <CommonIconsChart class="w-5 h-5 fill-white/50" />
                    <span class="text-white/50 text-sm">{{ props.chartCount }}</span>
                </div>
            </div>
        </div>
    </div>  

</template>