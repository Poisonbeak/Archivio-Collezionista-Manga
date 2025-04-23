window.addEventListener("DOMContentLoaded", e => {
    const dateRow = document.querySelector("ul").children[2];
    const dateString = dateRow.innerText.split(": ").pop();
    const date = new Date(dateString);
    
    const locale = "it-IT";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const localizedDate = date.toLocaleDateString(locale, options);

    dateRow.innerHTML = `<b>Data di nascita: </b>${localizedDate}`;
})