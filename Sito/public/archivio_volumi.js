window.addEventListener("DOMContentLoaded", e => {
    const checkbox = document.getElementsByClassName("checkboxPosseduto");
    const titoli = document.getElementsByClassName("titolo_volume");
    // console.log(checkbox);
    // console.log(titoli);
    
    
    for (let i = 0; i < checkbox.length; i++) {
        // console.log(titoli[i].innerText);

        checkbox[i].addEventListener("change", e => {
            
            if (checkbox[i].checked) {
                fetch("http://localhost:5000/volume", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: new URLSearchParams(
                        {
                            'nickname': 'otaku_lover',
                            'volume': titoli[i].innerText,
                        }
                    )
                })
                .then(message => {
                    alert("Aggiunto con successo!");
                })
                .catch(err => {
                    console.error(err.message);
                });

            } else {
                
                // fetch("http://localhost:5000/volume", {
                //     method: 'DELETE',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: new URLSearchParams(
                //         {
                //             'nickname': 'otaku_lover',
                //             'volume': titoli[i].innerText,
                //         }
                //     )
                // })
                // .then(message => {
                //     alert("Rimosso con successo!");
                // })
                // .catch(err => {
                //     console.error(err.message);
                // }); 
            }

        })
    }
})