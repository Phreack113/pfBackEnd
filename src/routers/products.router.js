const { Router } = require('express')
const router = Router()

const ProductManager = require('../productManager')
const productManager = new ProductManager('./src/data/products.json')

router.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await productManager.getProducts()
    const filterProducts = limit ? products.slice(0, limit) : products
    res.json(filterProducts)
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const products = await productManager.getProductById(pid)
    res.json({ products })
})

router.post('/', async (req, res) => {
    const r = await productManager.addProduct(req.body)
    res.json(r)
})

router.patch('/:pid', async (req, res) => {
    const objUpdate = req.body
    const { pid } = req.params
    console.log(pid, objUpdate)
    const r = await productManager.updateProduct(pid, objUpdate)
    res.json(r)
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const r = await productManager.deleteProduct(pid)
    res.json(r)
})

module.exports = router