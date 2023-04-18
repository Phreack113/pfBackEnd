const { Router } = require('express')
const router = Router()

const Products = require('../../dao/models/Products.model')

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort = 'asc' } = req.query
        
        const pQuery = {
            category: {
                $regex: query,
                $options: 'i'
            }
        }

        const pOptions = {
            limit,
            page,
            sort: {
                price: sort
            }
        }

        const products = await Products.paginate(pQuery, pOptions)
        const { docs: payload, totalPages, prevPage, nextPage, page : npage, hasPrevPage, hasNextPage } = products
        

        const resObj = {
            status: 'success',
            payload,
            totalPages, 
            prevPage, 
            nextPage, 
            npage, 
            hasPrevPage, 
            hasNextPage,
            prevLink: hasPrevPage ? `http://localhost:3002/api/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null,
            nextLink: hasNextPage ? `http://localhost:3002/api/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null
        }
        
        res.json(resObj)

    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log({ error })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const product = await Products.findById(pid)
        res.json({ product })
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log({ error })
    }
})

router.post('/', async (req, res) => {
    try {
        const { code, title, description, price, thumbnail, stock, category } = req.body

        const newProduct = {
            code,
            title,
            description,
            price,
            thumbnail,
            stock,
            category
        }

        const product = await Products.create(newProduct)
        console.log(product)
        res.json(product)
        realTimeProducts()
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log({ error })
    }
})

router.patch('/:pid', async (req, res) => {
    try {
        const objUpdate = req.body
        const { pid } = req.params
        const product = await Products.findByIdAndUpdate(pid, objUpdate, { returnDocument: 'after' })
        res.json(product)
        realTimeProducts()
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const r = await Products.findByIdAndDelete(pid)
        res.json(r)
    } catch (error) {
        res.status(400).json({ error: 'Bad request' })
        console.log({ error })
    }
})

const realTimeProducts = async () => {
    try {
        const products = await Products.find()
        io.emit('realtimeproducts', products)
    } catch (error) {
        console.log(error)
    }
}

module.exports = router