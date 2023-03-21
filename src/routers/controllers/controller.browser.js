const { Router } = require('express')
const router = Router()

const { productManager } = require('./controller.products')

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    console.log(products)
    res.render('home.handlebars', {
        products,
        title: 'Productos',
        style: 'style.css'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts()
    console.log(products)
    res.render('realtimeproducts.handlebars', {
        products,
        title: 'realtimeproducts',
        style: 'style.css'
    })
})

module.exports = router