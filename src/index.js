const beerURL = `http://localhost:3000/beers`

document.addEventListener("DOMContentLoaded", () => {
    fetchBeers()
});

function fetchBeers() {
    fetch(beerURL)
    .then(response => response.json())
    .then(json => {
        for (const beer of json) {
            renderBeer(beer)
        }
    })
};

function renderBeer(beer) {
    const listGroup = document.getElementById('list-group')
    const line = document.createElement('li')
    line.setAttribute('class', "list-group-item")
    line.setAttribute('id', "list-group-item")
    listGroup.append(line)
    line.innerText = `${beer.name}`
    line.addEventListener("click", () => {
        showBeerInfo(beer)
    })
};

function showBeerInfo(beer) {
    const beerDetailDiv = document.getElementById('beer-detail')
    beerDetailDiv.innerHTML = `
    <br>
    <h1>${beer.name}</h1>
    <img src= ${beer.image_url}>
    <h3>${beer.tagline}</h3>`
    const textArea = document.createElement('textarea')
    textArea.setAttribute('id', "beer-text")
    beerDetailDiv.append(textArea)
  textArea.innerText = `${beer.description}`

    const button = document.createElement('button')
    button.setAttribute('id', "edit-beer")
    button.setAttribute('class', "btn btn-info")
    beerDetailDiv.append(button)
    button.innerText = "Save"
    button.addEventListener("click", () =>{
     
        console.log("click click")
        patchBeer(beer)
    })
};

// have to refresh to see changes

function patchBeer(beer) {
    const textArea = document.getElementById('beer-text')
    
    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            description: document.getElementById('beer-text').innerText = textArea.value
        })

    })
    .then(response => response.json())
    .then(json => console.log(beer))
};
