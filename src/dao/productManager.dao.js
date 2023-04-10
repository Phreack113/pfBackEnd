const fs = require('fs')

class ProductManager {
    
    constructor(path){
        this.products = [];
        this.path = path;
    }

    writeFile =  async () => {
        try{
            const productsObj = {
                products: this.products
            }
            const productsStr = JSON.stringify(productsObj)
            await fs.promises.writeFile(this.path, productsStr)
        } catch(err) {
            console.log(err)
        }
    }

    readFile = async () => {
        try{
            const file = await fs.promises.readFile(this.path, 'utf-8')
            const productsObj = JSON.parse(file)
            // console.log('Objeto leido del archivo json:', productsObj)
            this.products = productsObj.products
        } catch(err) {
            console.log(err)
        }
    }

    addProduct = async (product) => {
        
        const {code, title, description, price, status = true, stock, category, thumbnail = []} = product 
        
        if (!code || !title || !description || !price || !stock || !category){
            return 'Debe ingresar la totalidad de los parámetros'
        }
        
        await this.readFile();
        
        const duplicates = this.products.find( prd => prd.code === code);
        if (duplicates) {
            return 'El codigo ya existe, ingrese un producto distinto o ingrese otro código'
        } 

        const prd = {
            code,
            title, 
            description, 
            price, 
            thumbnail, 
            stock,
            category,
            status
        }

        //construcción de ID
        prd.id = this.products.length>0 ? this.products[this.products.length-1].id + 1 : 0
        
        this.products.push(prd)
        await this.writeFile()
        return prd
    }
    
    getProducts = async () => {
        await this.readFile();
        const noneDeleteProducts = this.products.filter( prd => prd.status) 
        return noneDeleteProducts;
    }
    
    getProductById = async (id) => {
        await this.readFile();
        const prd = this.products.find( p => `${p.id}` === id);
        return prd || 'Not found'
    }
    
    updateProduct = async (id, objUpdate) => {

        await this.readFile();
        const i = this.products.findIndex( p => `${p.id}` === id);
        if (i >= 0){
            
            //Actualiza solo si la propiedad existe y es distinta de id
            Object.keys(this.products[i]).forEach( key => {
                if (key != 'id' && objUpdate[key]) this.products[i][key] = objUpdate[key]
            })
            
            await this.writeFile()
            return this.products[i]
        } else {
            return 'ID no encontrado'
        }
    }
    
    deleteProduct = async (id) => {
        await this.readFile();
        const i = this.products.findIndex( p => `${p.id}` === id);
        
        if (i >= 0 && this.products[i].status){
            this.products[i].status = false
            await this.writeFile()
            return `El producto ID:${id} se eliminó con éxito`
        } else if(i >= 0 && !this.products[i].status) {
            return `El producto ID:${id} ya se encuemtra eliminado`
        } else {
            return 'ID no encontrado'
        } 
    }
}

module.exports = ProductManager

