
export const configs = reactive({
    version: 1,
    priceSymbol: '$',
    allergens: {
        title: 'Allergens',
        show: true
    },
    promos: true,
    bundles: true,
    
  })

export const useFreeDesigns = () => {
  

  return {
    configs
  }

}