window.addEventListener("DOMContentLoaded", e => {
    let tabellaRivenditori = document.getElementById("tabella_rivenditori");
    let esistonoRivenditori = document.querySelector("tr > td");
    console.log(esistonoRivenditori);
    
    if (!esistonoRivenditori) {
        tabellaRivenditori.innerHTML = "<b><p>Nessun rivenditore con questo volume</p></b>";
    }
})