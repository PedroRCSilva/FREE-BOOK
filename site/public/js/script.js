const carrossel = document.querySelector(".session-carrossel div");
const btnCarrossel = document.querySelectorAll(".session-carrossel .btn");


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
  anteriorCarrossel();
});
btnCarrossel[1].addEventListener("click", () => {
  proximoCarrossel();
});
//

function salvarSession(tipo){
  sessionStorage.setItem("INFO_HOME",tipo)
  window.location="./login-cadastro.html";
}

