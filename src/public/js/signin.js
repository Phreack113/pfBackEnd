const signinForm = document.querySelector('#signinForm')

signinForm.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(signinForm)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    console.log(obj)

    const url = '/api/users'
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
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

