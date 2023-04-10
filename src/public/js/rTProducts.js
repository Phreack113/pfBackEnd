const socket = io()
const productsContainer = document.getElementById('products')

socket.on('realtimeproducts', prds => {
    const { products } = prds
    productsContainer.innerHTML = ''
    products.forEach( pdt => productsContainer.append(prdUI(pdt)));
})

const prdUI = pdt => {
    const div = document.createElement('div')
    div.classList.add('product-card')
    div.innerHTML = `
        <div class="product-category">
            <p>${pdt.category}</p>
        </div>
        <div class="productCardBottom">
            <div class="product-title">
                <h2>${pdt.title}</h2>
            </div>
            <div class="product-description">
                <p>${pdt.description}</p>
            </div>
            <div class="product-data">
                <p>Code: ${pdt.code}</p>
                <p>Stock: ${pdt.stock}</p>
                <p>Price: $${pdt.price}</p>
            </div>        
        </div>
    `
    return div
}


