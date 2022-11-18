const carrossel = document.querySelector(".session-carrossel div");
const btnCarrossel = document.querySelectorAll(".session-carrossel .btn");
var intervalCarrossel = setInterval(() => {
  if (validacao) {
    proximoCarrossel();
  } else {
    anteriorCarrossel();
  }
}, 3000);

// FUNÇÕES CRIADAS PARA CARROSSEL NA PÁGINA HOME
let validacao = true;
function proximoCarrossel() {
  if (carrossel.scrollWidth > carrossel.scrollLeft + 1349 && validacao) {
    carrossel.scrollLeft += carrossel.clientWidth + 20;
  }
}

function anteriorCarrossel() {
  carrossel.scrollLeft -= carrossel.clientWidth + 20;
  if (carrossel.scrollLeft == 0) {
    validacao = true;
  }
}

btnCarrossel[0].addEventListener("click", () => {
  clearInterval(intervalCarrossel);
  anteriorCarrossel();
});
btnCarrossel[1].addEventListener("click", () => {
  clearInterval(intervalCarrossel);
  proximoCarrossel();
});
//

function colorNavbar(){
const navbar= document.querySelector("header .container");
  navbar.classList.toggle("active",scrollY>=20);
}

window.addEventListener("scroll",()=>{
  colorNavbar()
})
