const { R2U } = window;
;(async () => {
    await R2U.init({ customerId: '5e8e7580404328000882f4ae' })
    const sku = 'social-nft'
    const arButton = document.getElementById('ar-button')
    await R2U.ar.attach({
        element: arButton,
        sku
    })
})()