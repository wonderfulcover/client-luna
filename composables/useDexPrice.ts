let cache = {
    expiry: null,
    data: null,
  }
  
  export const fetchDexScreenerPrices = async (chainId: string, pairId: string) => {
    try {
      const cacheDuration = 5 * 60 * 1000 // 5 minutes in milliseconds
      const now = new Date()
  
      // Check if the cache exists and is still valid
      if (cache.data && cache.expiry && now < cache.expiry) return cache.data
  
      // Construct the Dexscreener API URL
      const url = `https://api.dexscreener.com/latest/dex/pairs/${chainId}/${pairId}`
  
      // Fetch data from the Dexscreener API
      const response = await $fetch(url)
  
      // Parse and format the data from the API response
      if (response?.pairs?.length) {
        const pair = response.pairs[0] // Assume we're interested in the first pair
        const formattedData = {
          chainId: pair.chainId,
          dexId: pair.dexId,
          pairAddress: pair.pairAddress,
          url: pair.url,
          baseToken: {
            address: pair.baseToken.address,
            name: pair.baseToken.name,
            symbol: pair.baseToken.symbol,
          },
          quoteToken: {
            address: pair.quoteToken.address,
            name: pair.quoteToken.name,
            symbol: pair.quoteToken.symbol,
          },
          priceNative: pair.priceNative,
          priceUsd: pair.priceUsd,
          liquidityUsd: pair.liquidity.usd,
          liquidityBase: pair.liquidity.base,
          liquidityQuote: pair.liquidity.quote,
          fdv: pair.fdv,
          marketCap: pair.marketCap,
          info: {
            imageUrl: pair.info?.imageUrl || null,
            websites: pair.info?.websites?.map((w) => w.url) || [],
            socials: pair.info?.socials?.map((s) => ({
              platform: s.platform,
              handle: s.handle,
            })) || [],
          },
          boosts: pair.boosts || {},
        }
  
        // Update cache with new data and expiry time
        cache = {
          data: formattedData,
          expiry: new Date(now.getTime() + cacheDuration),
        }
  
        return formattedData
      } else {
        console.error('No pairs data available from Dexscreener API')
        return {}
      }
    } catch (e) {
      console.error('Failed to fetch Dexscreener data:', e)
      return {}
    }
  }
  