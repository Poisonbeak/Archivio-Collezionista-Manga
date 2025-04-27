window.addEventListener("DOMContentLoaded", e => {
    const checkbox = document.getElementsByClassName("checkboxPosseduto");
    const titoli = document.getElementsByClassName("titolo_volume");
    
    fetch("http://localhost:5000/controlloVolumiPosseduti")
    .then(response => response.json())
    .then(message => {
        let titoliPosseduti = message;
        console.log(titoliPosseduti);
        
        for (let i = 0; i < titoliPosseduti.length; i++) {      // efficienza bruttissima (esponenziale), ma ce la facciamo andare bene
            for (let j = 0; j < checkbox.length; j++) {
                if (titoliPosseduti[i].Titolo == titoli[j].innerText) {
                    checkbox[j].checked = true;
                    continue;
                }
            }
        }
    })
    .catch(err => {
        console.error(err.message);
    });

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("change", e => {
            
            // se l'utente mette la spunta, aggiunge il volume alla collezione; se la toglie, lo rimuove
            if (checkbox[i].checked) {
                fetch("http://localhost:5000/volume", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: new URLSearchParams(
                        {
                            'nickname': Cookies.get("nickname"),    // altro possibile problema di sicurezza, mi sa. Certo che ne siamo pieni...
                            'volume': titoli[i].innerText,
                        }
                    )
                })
                .then(response => response.text())
                .then(message => {
                    alert(message);
                })
                .catch(err => {
                    console.error(err.message);
                });

            } else {
                fetch("http://localhost:5000/volume", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            'nickname': Cookies.get("nickname"),
                            'volume': titoli[i].innerText,
                        }
                    )
                })
                .then(response => response.text())
                .then(message => {
                    alert(message);
                })
                .catch(err => {
                    console.error(err.message);
                }); 
            }

        })
    }
})