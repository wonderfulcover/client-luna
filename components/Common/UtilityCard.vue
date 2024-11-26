<script lang="ts" setup>
    interface UtilityCard {
        title: string;
        description: string;
    }

    const props = defineProps<UtilityCard>();

</script>

<template>
    <div class="flex justify-start items-start flex-col gap-4 p-6 w-full h-full">
        <div class="opacity-50">
            <slot />
        </div>
        <div class="flex flex-col justify-start items-start gap-1">
            <h4 class="font-semibold text-base text-gradient">{{ props?.title }}</h4>
            <p class="text-sm leading-6 text-white/60">{{ props?.description }}</p>
        </div>
    </div>
</template>