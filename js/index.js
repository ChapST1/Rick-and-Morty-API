import { modal} from "./constants/index.js";
import { getCharacters } from "./api/index.js";
import { showData, disableModal, enableFullScreen } from "./functions/index.js";
import { mutationObserver, observerFunction } from "./utils/index.js";

window.addEventListener('load', async () => {
    mutationObserver();
    const data = await getCharacters();
    showData(data)
    observerFunction();
    enableFullScreen()
})

modal.addEventListener('click', (e) =>{
    if(e.target.classList.contains('modal')){
        disableModal()
    }
})





