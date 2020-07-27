
const beerURL = 'http://localhost:3000/beers'

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM has been parsed')
    getBeers()

})

function getBeers(){

    fetch(beerURL).then(res => res.json()).then(json => iterateBeers(json))
}

function iterateBeers(beers){

    beers.forEach(beer => renderBeers(beer))
}

function renderBeers(beer){

    beerUL = document.getElementById('list-group')
    beerLI = document.createElement('li')
    beerLI.innerHTML = beer.name

    beerUL.appendChild(beerLI)

    beerLI.addEventListener('click', () =>{
        
        beerDetail = document.getElementById('beer-detail')
        beerDetail.innerHTML = ''

        beerForm = document.createElement('form')
        beerForm.innerHTML = `
        <label for="fname">Beer Description:</label><br>
        <input type="text" id="b-d" name="fname"><br>
        <input type="submit" value="Submit">
        `

        beerDescription = document.createElement('p')
        beerDescription.id = 'beer-desc'
        beerDescription.innerHTML = beer.description


        beerName = document.createElement('h1')
        beerName.innerHTML = beer.name

        beerImg = document.createElement('img')
        beerImg.src = beer.image_url

        beerTagline = document.createElement('h3')
        beerTagline.innerHTML = beer.tagline


 

        beerDetail.appendChild(beerName)
        beerDetail.appendChild(beerImg)
        beerDetail.appendChild(beerTagline)
        beerDetail.appendChild(beerDescription)
        beerDetail.appendChild(beerForm)
        


        beerForm.addEventListener('submit', (e) => {

            e.preventDefault()
            beerInputVal = document.querySelector("#b-d")
            x = e.target[0].value
            beerDescription.innerHTML = x
            beer.description = x
            b = {
                description: x
            }
            fetch(`${beerURL}/${beer.id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json', 
                    Accept: 'application/json'
                },
                body: JSON.stringify(b)
            })
        })

      
    })
}

