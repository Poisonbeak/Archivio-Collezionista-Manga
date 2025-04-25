document.addEventListener("DOMContentLoaded", e => {
    const titoloManga = document.getElementsByTagName("h2");
    const listaVolumi = document.getElementsByClassName("lista_volumi_manga");
    console.log(titoloManga);
    console.log(listaVolumi);
    
    

    for (let i = 0; i < titoloManga.length; i++) {
        titoloManga[i].addEventListener("mouseenter", e => {    // metti il mouse sopra
            for (let j = 0; j < listaVolumi.length; j++) {
                listaVolumi[j].style.display = "none";
            }
            listaVolumi[i].style.display = "flex";
        })
        // titoloManga[i].addEventListener("mouseleave", e => {    // metti il mouse sopra
        //     listaVolumi[i].style.display = "none";
        // })
    }
})