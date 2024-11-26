<script setup lang="ts">
const route = useRoute()

const env = useRuntimeConfig()
const { BASE_URL } = env.public;

useHead({
  title: 'LUNA Virtuals',
  meta: [
    { name: 'description', content: '' },
    { property: 'og:title', content: 'LUNA Virtuals Protocol' },
    { property: 'og:description', content: 'LUNA is the first AI agent on the Virtuals Protocol' },
    { property: 'og:image', content: `${BASE_URL}/images/og_image.png` },
    { property: 'og:url', content: `${BASE_URL}${route.fullPath}` },
    { property: 'og:site_name', content: 'LUNA Virtuals' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
