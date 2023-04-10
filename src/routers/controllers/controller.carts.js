const { Router } = require('express')
const router = Router()

const Carts = require('../../dao/models/Carts.model')
const Products = require('../../dao/models/Products.model')

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const r = await Carts.findById(cid)
        res.json(r)
    } catch (error) {
        res.status(400).json({error: 'Bad request'})
        console.log(error)        
    }
})

router.post('/',  async (req, res) => {
    try {
        const r = await Carts.create({})
        res.json(r)
    } catch (error) {
        res.status(400).json({error: 'Bad request'})
        console.log(error)        
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await Carts.findById(cid)
        const prd = await Products.findById(pid)
        const pIndex = cart.products.findIndex(p => `${p._id}` === `${prd._id}`)
        pIndex >= 0 ? cart.products[pIndex].qty++ : cart.products.push({_id: pid, qty: 1}) 
        const updateCart = await Carts.findByIdAndUpdate(cid, cart, {returnDocument: 'after'})
        res.json(updateCart)
    } catch (error) {
        console.log(error)        
        res.status(400).json({error: 'Bad request'})
    }
})

module.exports = router