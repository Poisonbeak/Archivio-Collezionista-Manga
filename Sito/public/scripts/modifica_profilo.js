window.addEventListener("DOMContentLoaded", e => {
    const [nickname, nome, cognome, email, dataNascita, città, regione] = document.getElementsByTagName("input");
    const nicknameOriginale = nickname.value;
    const emailOriginale = email.value;

    const bottoneInvio = document.getElementById("bottone_invio");
    const displayRisposta = document.getElementById("display_risposta");

    bottoneInvio.addEventListener("click", e => {
        fetch("http://localhost:5000/profilo/modifica", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams(
                {
                    'nickname': nickname.value,
                    'nome': nome.value,
                    'cognome': cognome.value,
                    'email': email.value,
                    'data_di_nascita': dataNascita.value,
                    'città': città.value,
                    'regione': regione.value,
                    'nicknameOriginale': nicknameOriginale,
                    'emailOriginale': emailOriginale,
                }
            )
        })
        .then(response => response.json())
        .then(message => {
            displayRisposta.innerText = message;
        })
    })
})