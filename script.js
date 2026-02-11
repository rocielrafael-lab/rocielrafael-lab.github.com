// TEXTO LETRA POR LETRA
const mensaje = "¿Quieres ser mi San Valentín? ❤️";
let index = 0;
const velocidad = 120;
const textoElemento = document.getElementById("texto");

function escribirTexto() {
    if (index < mensaje.length) {
        textoElemento.innerHTML += mensaje.charAt(index);
        index++;
        setTimeout(escribirTexto, velocidad);
    }
}

escribirTexto();

// CORAZONES
const copas = document.querySelector(".copas");

function crearCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon");

    corazon.style.left = Math.random() * 240 + "px";
    corazon.style.top = Math.random() * 180 + "px";

    const colores = ["#ff3366", "#ff4d4d", "#ff66b2"];
    corazon.style.background = colores[Math.floor(Math.random() * colores.length)];

    copas.appendChild(corazon);
}

for (let i = 0; i < 120; i++) {
    crearCorazon();
}

// AUTOPLAY FIX (móviles)
document.body.addEventListener("click", () => {
    document.getElementById("musica").play();
});
