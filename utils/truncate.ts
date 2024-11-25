export const truncateAddress = (address: string, startCount: number, endCount: number) => {
    const string = `${address.slice(0, startCount)}....${address.substr(
      address.length - endCount,
      address.length,
    )}`
  
    return string
  }