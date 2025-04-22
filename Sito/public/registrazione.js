window.addEventListener("DOMContentLoaded", e => {
    const [nickname, password, nome, cognome, email, dataNascita, città, regione] = document.getElementsByTagName("input");

    const bottoneInvio = document.getElementById("bottone_invio");
    const displayRisposta = document.getElementById("display_risposta");

    bottoneInvio.addEventListener("click", e => {
        fetch("http://localhost:5000/registrazione", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams(
                {
                    'nickname': nickname.value,
                    'password': password.value, // GRAVE PROBLEMA DI SICUREZZA !1!1
                    'nome': nome.value,
                    'cognome': cognome.value,
                    'email': email.value,
                    'data_di_nascita': dataNascita.value,
                    'città': città.value,
                    'regione': regione.value,
                }
            )
        })
        .then(response => response.json())
        .then(message => {
            displayRisposta.innerText = message;
        })
    });
})