const beersUrl = "http://localhost:3000/beers"

document.addEventListener("DOMContentLoaded", () => {
    getBeersList()
})

function getBeersList() {
    fetch(beersUrl)
    .then(res => res.json())
    .then(json => json.forEach(beer => beerCard(beer)))
}

function beerCard(beer) {
    let ul = document.getElementById("list-group")
    let li = document.createElement("li")
    li.classList.add("list-group-item")
    li.innerText = beer.name
    ul.appendChild(li)
    li.addEventListener("click", () => {
        let div = document.getElementById("beer-detail")
        div.innerHTML= `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>
        `
        let btn = document.getElementById("edit-beer")
        btn.addEventListener("click", () => {
            let edit = document.querySelector("textarea")
            beer.description = edit.value
            saveClick(beer)
        })

    })
}

function saveClick(beer) {
    
    fetch(`${beersUrl}/${beer.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(beer)

    })
    
}

