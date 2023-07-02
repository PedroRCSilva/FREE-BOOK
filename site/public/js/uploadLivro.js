const progressCircle = document.querySelectorAll(".circle");
const progressCircleLine = document.querySelector(".line-progress");
const stepProgress = document.querySelectorAll(".campo");
const btnProx = document.querySelectorAll(".next");
const btnPrev = document.querySelectorAll(".prev ");
const lineProgress = document.querySelectorAll(".line");
let etapaProgress = 0;

function calculandoTamanhoTextArea() {
  var descricaoVar = in_descricao.value;
  var lengthText = document.querySelector(".lengthText");
  lengthText.innerHTML = `${descricaoVar.length}/1000`;
}
function avancar() {
  var tituloVar = in_titulo.value;
  // var autorVar = infoSection.nome+" "+infoSection.sobrenome;
  var descricaoVar = in_descricao.value;
  var img = image.files;

  var urlPdf = in_url;
  // var fkUsuarioVar = infoSection.idUsuario;
  var validacao = true;

  if ((etapaProgress == 0 && tituloVar.length <= 5) || tituloVar.length > 40) {
    alert("INSIRA UM TITULO COM NO MINIMO 5 CARACTERES E NO MAXIMO 15");
    validacao = false;
  }
  if ((etapaProgress == 1 && descricaoVar < 10) || descricaoVar > 1000) {
    alert(
      "INSIRA UMA DESCRIÇÃO COM NO MINIMO 1O CARACTERES E COM UM MAXIMO DE 1000"
    );
    validacao = false;
  }

  if ((etapaProgress == 2 && urlPdf.length > 2083) || urlPdf == "") {
    validacao = false;
    alert("INSIRA UM URL VÁLIDA");
  }
  if (etapaProgress == 3 && img.length < 1) {
    validacao = false;
    alert("INSIRA UMA CAPA PARA SEU LIVRO");
  }

  if (etapaProgress < progressCircle.length - 1 && validacao) {
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
  var teste = document.querySelector("#inputSelect h2");
  var lerImagem = new FileReader();
  lerImagem.onload = (arquivo) => {
    imgVar = arquivo.target.result;
    teste.remove();
    imgFile.src = imgVar;
    imgFile.style.width = "100%";
    imgFile.style.height = "100%";
  };
  lerImagem.readAsDataURL(image.files[0]);
}
function cadastrarLivro() {
  var infoSection = JSON.parse(sessionStorage.getItem("INFO_USUARIO"));
  var dtLancVar = new Date();
  var tituloVar = in_titulo.value;
  var autorVar = infoSection.nome + " " + infoSection.sobrenome;
  var descricaoVar = in_descricao.value;
  var fkUsuarioVar = infoSection.idUsuario;
  var urlFile = in_url.files[0];
  var generoVar = document.querySelector("#in_genero select").value;
  
  dtLancVar = dtLancVar
    .toLocaleDateString({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-")
    .split("-")
    .reverse()
    .join("-");
  
  var requestBody = new FormData();
  requestBody.append("pdf", urlFile);
  requestBody.append("dtLanc", dtLancVar);
  requestBody.append("titulo", tituloVar);
  requestBody.append("autor", autorVar);
  requestBody.append("descricao", descricaoVar);
  requestBody.append("fkUsuario", fkUsuarioVar);
  requestBody.append("genero", generoVar);
  requestBody.append("img", imgVar);
  

  console.log(requestBody);
  fetch("/livro/cadastrarLivro", {
    method: "POST",
    body: requestBody,
  })
    .then((resposta) => {
      if(resposta.status == 200){
        window.location = "dashboard-book.html";
      }
    })
    .catch((resposta) => {
      console.log("Não funcionou" + resposta);
    });
}