window.addEventListener("DOMContentLoaded", e => {
    const linkLogout = document.getElementById("logout");
    const displayRisposta = document.getElementById("display_risposta");

    linkLogout.addEventListener("click", e => {
        fetch("http://localhost:5000/logout", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(message => {
            displayRisposta.innerText = message;
        })
    });
})