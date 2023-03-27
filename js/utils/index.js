import { openModal, showData } from "../functions/index.js";
import { getCharacters } from "../api/index.js";


//variables
let i = 1 //-> page iterator ( infinite scroll )



export function observerFunction() {
    let options = {
        rootMargin: '100px 0px 0px 0px',
    }
    let elementObserver = app.lastElementChild.getAttribute("id");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
                i++;
                const data = await getCharacters(i);
                showData(data);
                observerFunction();
                observer.unobserve(entry.target) // dejamos de observar
            }
        })

    }, options)
    observer.observe(document.getElementById(elementObserver));
}

// mutation observer
export function mutationObserver(){
    const observer = new MutationObserver((mutations) => {
        if(mutations){
            const allImages = document.querySelectorAll(".character")
            openModal(allImages)
        }
    })
    observer.observe(app, {childList: true})
}
