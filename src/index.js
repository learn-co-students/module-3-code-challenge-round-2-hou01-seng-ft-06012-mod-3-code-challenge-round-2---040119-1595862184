document.addEventListener('DOMContentLoaded', () => {
    getBeerData()
})

function getBeerData() {
    fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(beers => displayBeers(beers))
}

function displayBeers(beers) {
    beers.forEach(beer => {
        const ul = document.getElementById('list-group')
        const li = document.createElement('li')
        li.classList = "list-group-item"
        li.innerText = beer.name
        ul.appendChild(li)
        li.addEventListener('click', () => {
            showBeer(beer)
        })
    })
}

function showBeer(beer) {
    fetch(`http://localhost:3000/beers/${beer.id}`)
    .then(res => res.json())
    .then(data => {
        const beerDetail = document.getElementById('beer-detail')
        beerDetail.innerHTML = ` <h1>${data.name}</h1>
        <img src=${data.image_url}>
        <h3>${data.tagline}</h3>
        <textarea id="text-area">${data.description}</textarea>
        <button id="edit-beer" class="btn btn-info">save</button>`
        const saveBtn = document.getElementById('edit-beer')
        saveBtn.addEventListener('click', () => {
           const newText = document.getElementById('text-area').value 
           updateText(data, newText)
        })
    })
}

function updateText(beer, newText) {
    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            description: newText
        })
    })
}


   

