window.addEventListener("DOMContentLoaded", e => {
    const [nickname, password, nome, cognome, email, dataNascita] = document.getElementsByTagName("input");
    const [città, regione] = document.getElementsByTagName("select");

    const today = new Date();
    const maxDateString = today.toISOString().split('T')[0]
    dataNascita.max = maxDateString; 

    const form = document.getElementById("form_registrazione");
    const displayRisposta = document.getElementById("display_risposta");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!regex.test(password.value)) {
            alert("La password deve contenere almeno 8 caratteri, una minuscola, una maiuscola, un numero e un simbolo.");
            passwordInput.focus();
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
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