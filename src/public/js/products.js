const btns = document.querySelectorAll('.order')

const orderItems = e => {
    const { id } = e.target.dataset
    const url = `http://localhost:3002/api/carts/6432f06d6dbfa2051d2453c2/product/${id}`
    const headers = {
        'Content-Type' : 'aplication/json'
    }
    const body = {}
    const method = 'PUT'
    fetch(url,{
        headers,
        method,
        body
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

btns.forEach(btn => btn.addEventListener('click', orderItems))

