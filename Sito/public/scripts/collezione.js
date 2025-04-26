document.addEventListener("DOMContentLoaded", e => {
    const manga = document.getElementsByClassName("raccoglitore_manga");
    const listaVolumi = document.getElementsByClassName("lista_volumi_manga");

    for (let i = 0; i < manga.length; i++) {
        manga[i].addEventListener("mouseenter", e => {    // metti il mouse sopra
            for (let j = 0; j < listaVolumi.length; j++) {
                listaVolumi[j].style.display = "none";
            }
            listaVolumi[i].style.display = "flex";
        })
    }
})