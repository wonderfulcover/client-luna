import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

let builder: any

const getBuilder = () => {
  if (!builder) {
    const { SANITY_PROJECT_ID, SANITY_DATASET } = useRuntimeConfig()

    const client = createClient({
      projectId: SANITY_PROJECT_ID as string,
      dataset: SANITY_DATASET as string,
      useCdn: true,
    })

    builder = imageUrlBuilder(client)
  }

  return builder
}

export const sanityImageUrl = (source: any) => {
  try {
    if (!source) {
      return {
        url() {
          return ''
        },
      }
    }
    return getBuilder().image(source)
  } catch (e) {
    throw new Error(e as any)
  }
}
