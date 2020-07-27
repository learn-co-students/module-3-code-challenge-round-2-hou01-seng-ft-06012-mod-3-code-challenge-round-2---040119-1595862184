beerURL = "http://localhost:3000/beers"
let beerList

document.addEventListener('DOMContentLoaded', () => {
    getBeers()
    console.log('hiii')
})

function getBeers() {
    fetch(beerURL).then(res => res.json())
    .then(json => {
        beerList = json;
        renderBeerList()
    })
}

function renderBeerList() {
    for (const beer of beerList) {
        showBeer(beer)
    }
}

function showBeer(beer) {
    const listGroup = document.getElementById('list-group')
    const li = document.createElement('li')
    li.className = "list-group-item"
    li.innerHTML = beer.name

    li.addEventListener('click', e => {
        showBeerStuff(beer)
    })

    listGroup.appendChild(li)
}

function showBeerStuff(beer) {
    const beerDetail = document.getElementById('beer-detail')
    beerDetail.innerHTML = `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea id="beer-description">${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>
    `

    const editButton = document.getElementById('edit-beer')
    editButton.addEventListener('click', e => {
        const beerDescription = document.getElementById('beer-description')
        beer.description = beerDescription.value
        fetch(`${beerURL}/${beer.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                description: beer.description
            })
            
        })
        showBeerStuff(beer)
    })
}