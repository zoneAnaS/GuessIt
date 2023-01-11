// Create buttons

let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
displaBtn(alphabets);
function displaBtn(str) {
    let cont = document.querySelector(".word-typing-section");
    cont.innerHTML = "";
    for (let alphabets of str) {
        cont.innerHTML += `<button class="alphabet-buttons" data-id=${alphabets}>${alphabets}</button>`;
    }
}