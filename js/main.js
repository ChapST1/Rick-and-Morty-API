//variables
const modal = document.querySelector(".modal");
const modalCloseIcon = document.querySelector(".fa-xmark");


let i = 1;
async function getData() {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${i}`);
  const dataJson = await response.json();

  const app = document.querySelector('.div');
  const appContainer = document.querySelector('.app');
  app.innerHTML =
    `
    <article class="img-container">
        <img class="img" src="${dataJson.image}">
    </article>
    <article class="description-container">
        <aside class="information">
            <p class="id"><span>Id:</span> ${dataJson.id}</p>
            <p class="name"><span>Name:</span>${dataJson.name}</p>
            <p class="status"><span>Status:</span> ${dataJson.status}</p>
            <p class="specie"><span>Specie:</span> ${dataJson.species}</p>
            <p class="gender"><span>Gender:</span> ${dataJson.gender}</p>
            <p class="type"><span>Type:</span> ${dataJson.type}</p>
            <p class="origin"><span>Origin:</span> ${dataJson.origin.name}</p>
        </aside>
    </article>
    
    
    `;
  appContainer.appendChild(app);
  const image = document.querySelectorAll('.img');
  image.forEach(e => {
    e.addEventListener('click', () => {
      modal.classList.toggle("modal-active");
      modal.firstElementChild.setAttribute('src', e.getAttribute('src'))

      modalCloseIcon.addEventListener('click', () => modal.classList.remove("modal-active"))
    })
  })
  return appContainer;
}
const btnNext = document.querySelector('.btn-next').addEventListener('click', () => {
  i++;
  getData();
  if (i > 826) {
    i = 1;
    getData();
  }
})
const btnPrev = document.querySelector('.btn-prev').addEventListener('click', () => {
  i--;
  getData()
  if (i < 1) {
    i = 826;
    getData();
  }
})
getData();
const menu = document.querySelector('.menu').addEventListener('click', () => {
  const menuLine = document.querySelector('.menu-line').classList.toggle('active-line')
  const nav = document.querySelector(".nav").classList.toggle('nav-active')
})

