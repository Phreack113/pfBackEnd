const { Router } = require('express')
const router = Router()

const CartManager = require('../../cartManager')
const cartManager = new CartManager('./src/data/carts.json', './src/data/products.json')

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    const r = await cartManager.getCartById(cid)
    res.json(r)
})

router.post('/',  async (req, res) => {
    const r = await cartManager.createCart()
    res.json(r)
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    const r = await cartManager.addProduct(cid, pid, quantity)
    res.json(r)
})

module.exports = router