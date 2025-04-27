window.addEventListener("DOMContentLoaded", e => {
    const [nickname, nome, cognome, email, dataNascita] = document.getElementsByTagName("input");
    const [città, regione] = document.getElementsByTagName("select");
    const nicknameOriginale = nickname.value;
    const emailOriginale = email.value;

    const today = new Date();
    const maxDateString = today.toISOString().split('T')[0]
    dataNascita.max = maxDateString; 

    const form = document.getElementById("form_modifica");
    const displayRisposta = document.getElementById("display_risposta");

    form.addEventListener("submit", e => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

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