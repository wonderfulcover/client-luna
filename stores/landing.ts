import { defineStore } from 'pinia'

const pageLandingQuery = groq`*[_type == "landing"] {
    ...
}`

export const useLandingStore = defineStore('landingStore', () => {
  const sanity = useSanity()
  
  const landingPageData = ref<any>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<unknown>(null)


  const getSanityLandingPage = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await sanity.fetch(pageLandingQuery)
      landingPageData.value = data[0] || []
    }
    catch (err) {
      error.value = err
      console.log(`err`, err)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    landingPageData,
    isLoading,
    error,
    getSanityLandingPage,
  }
})
