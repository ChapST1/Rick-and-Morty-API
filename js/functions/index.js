import { modal } from "../constants/index.js"
import { API_URL } from "../api/config/index.js"

import { app } from "../constants/index.js"
import { getCharacter, getResidents } from "../api/index.js"

// all functions for the rendering data

export function showData(arr) {
    arr.map((item) => {
        app.innerHTML += `
        <img class="character" src="${item.image}" alt="${item.name}" id="${item.id}" loading="lazy"/>`
    })
}


export function openModal(allImages) {
    allImages.forEach((img) => {
        img.addEventListener('click', async () => {
            modal.classList.add('modal-open');
            document.body.style.overflowY = 'hidden';
            const id = img.getAttribute("id");
            const url = `${API_URL}/${id}`
            addLoader(modal.firstElementChild)
            const findCharacter = await getCharacter(url);
            showDataModal(findCharacter);
            // add residents
            addLoader(document.querySelector(".description__residents"))
            const getLocation = await getCharacter(findCharacter.location.url)
            
            const residents = getResidents(getLocation.residents);
        
            setTimeout(() => {
                showResidentsOnModal(residents)
            }, 4000)
            
        })
    })
}


export function showDataModal(obj) {
    modal.firstElementChild.innerHTML = `
    <div class="card__image">
        <img src="${obj.image}" alt="${obj.name}" loading="lazy" class="card__img">
    </div>

    <div class="card__description description">
        <div class="description__info info">
            <h2 class="info__name">${obj.name}</h2>
            <p class="info__text"><span>Status:</span>${obj.status}</p>
            <p class="info__text"><span>Species:</span>${obj.species}</p>
            <p class="info__text"><span>Gender:</span>${obj.gender}</p>
            <p class="info__text"><span>Origin:</span>${obj.origin.name}</p>
            <p class="info__text"><span>Location:</span>${obj.location.name}</p>
        </div>
        <h3 class='residents__title'>Residents</h3>
        <div class="description__residents">
        </div>
    </div>
    `
}

export function clearData(element) {
    element.innerHTML = ""
}

export function addLoader(element) {
    element.innerHTML = `
     <div class="lds-ellipsis">
         <div></div>
         <div></div>
         <div></div>
         <div></div>
     </div>
    `
}

export function showResidentsOnModal(arr) {
    const descriptionElement = document.querySelector(".card__description")
    const residentsContainer = document.querySelector(".description__residents")

    clearData(residentsContainer)

    arr.map((resident) => {
        return residentsContainer.innerHTML += `
        <img class="character" id="${resident.id}" loading="lazy" src="${resident.image}" >
        `;
    })
    descriptionElement.appendChild(residentsContainer)

    //console.log(residentsContainer.childNodes);
    openModal(document.querySelectorAll(".character"))
}

export function disableModal() {
    const residentsContainer = document.querySelector(".description__residents")
    clearData(residentsContainer)

    document.body.style.overflowY = 'scroll';
    modal.classList.remove('modal-open');
    clearData(modal.firstElementChild)
}

export function handleError(){
    const errorGif = [
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWY2MWUzOTMwYmFjMjk4ZmViNGMwNjRhNGU0Mzg1YjRkODRmNjkwOCZjdD1n/l41JMXnXn4E7WQR8s/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2RmMGExYWI1OTRmOGJmNzA2ZmEyZDk4NGYwNThjZjEwNWM5MDFmNCZjdD1n/cOKjNdJDbqNCm4n0Jm/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTBhYTU0NjRiYmRmNjU1NThjZmRhYjQ0Njg1Zjg3ODM4ZjgzNWZmOSZjdD1n/xyTU7YNeG5cG9BTzil/giphy.gif",
        "https://media3.giphy.com/media/l378BzHA5FwWFXVSg/giphy.gif?cid=ecf05e47iud9pefvchrmlqqj4viljhw0pijhkxudom3qe3l7&rid=giphy.gif&ct=g",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDg2ZTU0MTUxNTc2ODE0OTljMjU2MDNlMGY4NjkzMjlhMDQyYTA3MyZjdD1n/tJqyalvo9ahykfykAj/giphy.gif",
        "https://media0.giphy.com/media/uZrLs0rcNc9sA/giphy.gif?cid=ecf05e47iud9pefvchrmlqqj4viljhw0pijhkxudom3qe3l7&rid=giphy.gif"
    ]
    const getRandomGif = errorGif[Math.floor(Math.random() * errorGif.length)]
    const residentsContainer = document.querySelector(".description__residents")

    residentsContainer.innerHTML = `
    <div class="error">
        <h2 class="error__title"> <span>Oops!</span> there are no residents here </h2>
        <img class="error__img" src="${getRandomGif}" alt="error gif"></video>
    </div>
    `
}