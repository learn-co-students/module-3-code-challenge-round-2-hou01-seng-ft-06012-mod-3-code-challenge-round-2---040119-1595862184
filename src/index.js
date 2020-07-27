const beerURL = 'http://localhost:3000/beers/'
document.addEventListener('DOMContentLoaded', ()=>{
    fetchBeers();
});

function fetchBeers(){
    fetch(beerURL)
    .then(resp => resp.json())
    .then(beers => renderBeers(beers))
};
function renderBeers(beers){
    beers.forEach(beer => showBeer(beer))
};

function showBeer(beer){
    // console.log(beer)
    const list = document.getElementById('list-group')
    const li = document.createElement('li')
        li.setAttribute('class', 'list-group-item')
        li.innerText = beer.name
    list.append(li)
    li.addEventListener('click', ()=>{
        showBeerInfo(beer);
    })
};

function showBeerInfo(beer){
    // console.log(beer.name)
    const beerDiv = document.getElementById('beer-detail')
        beerDiv.innerHTML = "";
        const h1 = document.createElement('h1')
            h1.innerText = beer.name
        beerDiv.append(h1)
        const beerImg = document.createElement('img')
            beerImg.src = beer.image_url
        beerDiv.append(beerImg)
        const h3 = document.createElement('h3')
            h3.innerText = beer.tagline
        beerDiv.append(h3)
        let textArea = document.createElement('textarea')
            textArea.setAttribute('id', 'beer-desc')
            textArea.innerText = beer.description
        beerDiv.append(textArea)
        const editBtn = document.createElement('button')
            editBtn.setAttribute('id', 'edit-beer')
            editBtn.setAttribute('class', 'btn btn-info')
            editBtn.innerText = 'Save'
        beerDiv.append(editBtn)
    editBtn.addEventListener('click', ()=> {
        const beerDesc = document.getElementById('beer-desc')
        beerDesc.textContent = beerDesc.value // << trying to show on the frontend 
        updateBeer(beer);
        
    })
};

function updateBeer(beer){
const beerDesc = document.getElementById('beer-desc')
    fetch(`${beerURL}${beer.id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "description": beerDesc.textContent = beerDesc.value
        })
    }).then(resp => resp.json()).then(data => console.log(data))
};