const progressCircle = document.querySelectorAll(".circle");
const progressCircleLine = document.querySelector(".line-progress");
const stepProgress = document.querySelectorAll(".campo");
const btnProx = document.querySelectorAll(".next");
const btnPrev = document.querySelectorAll(".prev ");
const lineProgress = document.querySelectorAll(".line");
const imgFile = document.querySelector(".input-select");
let etapaProgress = 0;

imgFile.addEventListener("click", () => {
  image.click();
});

function avancar() {
  if (etapaProgress < progressCircle.length - 1) {

    etapaProgress++;
    progressCircle[etapaProgress].classList.add("active");
    stepProgress[etapaProgress - 1].classList.remove("active");
    stepProgress[etapaProgress].classList.add("active");
    progressCircleLine.style.height = `${
      Number(progressCircleLine.style.height.replaceAll("vh", "")) + 14
    }vh`;
    lineProgress[etapaProgress].classList.add("active");
  }
}

function retroceder() {
  if (etapaProgress > 0) {
    progressCircle[etapaProgress].classList.remove("active");
    stepProgress[etapaProgress].classList.remove("active");
    stepProgress[etapaProgress - 1].classList.add("active");
    progressCircleLine.style.height = `${
      Number(progressCircleLine.style.height.replaceAll("vh", "")) - 14
    }vh`;
    lineProgress[etapaProgress].classList.remove("active");
    etapaProgress--;
  }
}

btnProx.forEach((element, idx) => {
  element.addEventListener("click", () => {
    avancar();
    if (idx == btnProx.length - 1) {
    }
  });
});
btnPrev.forEach((element, idx) => {
  element.addEventListener("click", () => {
    retroceder();
  });
});



var imgVar = "";
function transformarBase64() {
  var lerImagem = new FileReader();
  lerImagem.onload = (arquivo) => {
    imgVar = arquivo.target.result;
  };
  lerImagem.readAsDataURL(image.files[0]);
}

function cadastrarLivro() {
  var infoSection = JSON.parse(sessionStorage.getItem("INFO_USUARIO"));
  var dtLancVar = new Date();
  var tituloVar = in_titulo.value;
  var autorVar = infoSection.nome+" "+infoSection.sobrenome;
  var descricaoVar = in_descricao.value;
  var fkUsuarioVar = infoSection.idUsuario;
  dtLancVar = dtLancVar.toLocaleDateString({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replaceAll("/", "-").split("-").reverse().join("-");

  fetch("/usuarios/cadastrarLivro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tituloServer: tituloVar,
      autorServer: autorVar,
      dtLancServer: dtLancVar,
      imgServer: imgVar,
      descricaoServer: descricaoVar,
      fkUsuarioServer: fkUsuarioVar,
    }),
  })
    .then((resposta) => {
      console.log("Funcionou" + resposta);
    })

    .catch((resposta) => {
      console.log("Não funcionou" + resposta);
    });
}
