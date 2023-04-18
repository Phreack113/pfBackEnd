const { Router } = require('express')
const router = Router()

const Products = require('../../dao/models/Products.model')

router.get('/', async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('home.handlebars', {
        products,
        title: 'Productos',
        style: 'style.css'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('realtimeproducts.handlebars', {
        products,
        title: 'realtimeproducts',
        style: 'style.css'
    })
})

router.get('/products', async (req, res) => {
    const products = await Products.find().lean()
    console.log(products)
    res.render('products.handlebars', {
        products,
        title: 'Productos',
        style: 'style.css'
    })
})

module.exports = router