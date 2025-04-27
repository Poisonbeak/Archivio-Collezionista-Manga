window.addEventListener("DOMContentLoaded", e => {
    const inputNickname = document.getElementById("input_nickname");
    const inputPassword = document.getElementById("input_password");
    const form = document.getElementById("form_login");
    const displayRisposta = document.getElementById("display_risposta");

    form.addEventListener("submit", e => {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams(
                {
                    'nickname': inputNickname.value,
                    'password': inputPassword.value, // GRAVE PROBLEMA DI SICUREZZA !1!1
                }
            )
        })
        .then(response => response.json())
        .then(message => {
            displayRisposta.innerText = message;
        })
    });
})