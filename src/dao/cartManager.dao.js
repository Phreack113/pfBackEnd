const fs = require('fs')

class CartManager {
    
    constructor(cartsPath, productsPath){
        this.carts = [];
        this.prodcuts = [];
        this.cartsPath = cartsPath;
        this.productsPath = productsPath;
    }

    writeFile =  async () => {
        try{
            const cartsObj = {
                carts: this.carts
            }
            const cartsStr = JSON.stringify(cartsObj)
            await fs.promises.writeFile(this.cartsPath, cartsStr)
        } catch(err) {
            console.log(err)
        }
    }

    readFile = async (path, type) => {
        try{
            const file = await fs.promises.readFile(path, 'utf-8')
            const cartsObj = JSON.parse(file)
            this[type] = cartsObj[type]
        } catch(err) {
            console.log(err)
        }
    }

    createCart = async () => {
        await this.readFile(this.cartsPath, 'carts');

        const newCart = {
            id: this.carts.length > 0 ? this.carts[this.carts.length-1].id + 1 : 0,
            products: [] 
        }
        
        this.carts.push(newCart)
        await this.writeFile()

        return newCart
    }
    
    addProduct = async (cid, pid, quantity) => {
        
        await this.readFile(this.productsPath, 'products');
        const indexPrd = this.products.findIndex(p => `${p.id}` === pid && p.status)
        if (indexPrd < 0) return `El producto ID:${pid} no existe`

        await this.readFile(this.cartsPath, 'carts');
        
        if (quantity <= 0) return 'La cantidad debe ser mayor a cero'
        
        const indexCart = this.carts.findIndex(c => `${c.id}` === cid)
        if (indexCart < 0) return `El carrito ID:${cid} no existe`

        console.log(quantity)
        
        const prd = {
            id: parseInt(pid),
            quantity
        }

        if (this.carts[indexCart].products.length > 0){
            
            const indexCartPrd = this.carts[indexCart].products.findIndex(p => `${p.id}` === pid)
            
            if (indexCartPrd >= 0){
                this.carts[indexCart].products[indexCartPrd].quantity = prd.quantity
            } else {
                this.carts[indexCart].products.push(prd)
            }
        } else {
            this.carts[indexCart].products.push(prd)
        }
        
        
        await this.writeFile()
        return prd
    }
    
    getCartById = async (cid) => {
        await this.readFile(this.cartsPath, 'carts');
        const cart = this.carts.find( c => `${c.id}` === cid)
        console.log(cart,'aca')
        return cart || `El carrito con ID:${cid} no existe`
    }
        
}

module.exports = CartManager