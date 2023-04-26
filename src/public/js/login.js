const signinForm = document.querySelector('#loginForm')

signinForm.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(loginForm)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    console.log(obj)

    const url = '/auth/'
    const headers = {
        'Content-Type': 'application/json'
    }
    const method = 'POST'

    const body = JSON.stringify(obj)

    fetch(url,{
        headers,
        method,
        body
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.location.href = '/products'
    })
    .catch(err => console.log(err))
})

