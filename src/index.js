const URL = `http://localhost:3000/beers`

document.addEventListener('DOMContentLoaded', () => {
    console.log('hello')
    
    fetchBeer()
    
})


function fetchBeer() {
    fetch(URL)
    .then(response => response.json())
    .then(json => renderBeers(json))
}

function renderBeers(Beers) {
    Beers.forEach(beer => {
        renderBeer(beer)
    }) 
}

function renderBeer(beer) {
    const listGroup = document.getElementById('list-group')
    const li = document.createElement('li')
    li.className = ("list-group-item")
    li.innerHTML = `
    ${beer.name}
    `
    listGroup.append(li)

    li.addEventListener('click', () => {
        beerInfo(beer)
    })

}

function beerInfo(beer) {
    const beerD = document.getElementById('beer-detail')
    beerD.innerHTML = ""
    let div1 = document.createElement('div')
    div1.innerHTML = `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea id= text-${beer.id}>${beer.description}</textarea>
    <button id="edit-beer-${beer.id}" class="btn btn-info">
      Save
    </button>
    `
    beerD.append(div1)
    newInfo(beer.id)

}

function newInfo(id) {
    const button = document.getElementById(`edit-beer-${id}`)
    button.addEventListener('click', () => {
        console.log('hello')
        const value = document.getElementById(`text-${id}`).value
        fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(value)
        }) 
    
    })
}
