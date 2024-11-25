import { defineStore } from 'pinia'

export const useDexScreener = defineStore('dexScreener', () => {

    const env = useRuntimeConfig()
    const { CHAIN_ID, PAIR_ID, DEX_API_URL } = env.public

    const dexScreenData = ref<any>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<any>(null)
    const cache = ref<any>({
        expiry: null,
        data: null,
    })

    const fetchDexScreenerPrices = async () => {
        const cacheDuration = 5 * 60 * 1000
        const now = new Date()

        if (cache.value.data && cache.value.expiry && now < cache.value.expiry) {
            dexScreenData.value = cache.value.data
            return cache.value.data
        }

        const url = `${DEX_API_URL}/latest/dex/pairs/${CHAIN_ID}/${PAIR_ID}`

        try {
        isLoading.value = true
        error.value = null

        const response: any = await $fetch(url)

        if (response?.pairs?.length) {
            const pair = response.pairs[0]
            const formattedData = {
                baseToken: {
                    name: pair.baseToken.name,
                    symbol: pair.baseToken.symbol,
                    address: pair.baseToken.address,
                },
                quoteToken: {
                    name: pair.quoteToken.name,
                    symbol: pair.quoteToken.symbol,
                },
                marketCap: pair.marketCap,
                priceUsd: pair.priceUsd,
                priceNative: pair.priceNative,
                liquidityUsd: pair.liquidity.usd,
                fdv: pair.fdv,
                volume24h: pair.volume.h24,
                priceChange24h: {
                    percent: pair.priceChange.h24,
                    isPositive: pair.priceChange.h24 > 0,
                },
                volumeChange24h: {
                    volume: pair.volume.h24,                    
                },
            }

            cache.value = {
                data: formattedData,
                expiry: new Date(now.getTime() + cacheDuration),
            }
            dexScreenData.value = formattedData
            return formattedData
        } else {
            throw new Error('No pairs data available')
        }
        } catch (err) {
        error.value = err
        console.error('Failed to fetch Dexscreener data:', err)
        return {}
        } finally {
        isLoading.value = false
        }
    }

    return {
        dexScreenData,
        isLoading,
        error,
        fetchDexScreenerPrices,
    }
})
