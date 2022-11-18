function exbirInfoUsuario() {
  var infoUsuario = JSON.parse(sessionStorage.getItem("INFO_USUARIO"));

  var image = img_perfil;
  var nome = document.querySelector(".nome span");
  nome.innerHTML = `${infoUsuario.nome} ${infoUsuario.sobrenome}`;
  image.src = infoUsuario.img;
}
function sairSessao() {
  atualizarDataMetrica();
  sessionStorage.clear();
  setTimeout(() => {
    window.location = "index.html";
  });
}


function atualizarDataMetrica() {
  var idUsuario = JSON.parse(sessionStorage.getItem("INFO_USUARIO")).idUsuario;
  var dtMetrica = new Date();
  dtMetrica = dtMetrica
    .toLocaleDateString({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-")
    .split("-")
    .reverse()
    .join("-");

  fetch("/medidas/atualizarData", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuarioServer: idUsuario,
      dtMetricaServer: dtMetrica,
    }),
  })
    .then((resposta) => {
      console.log(resposta);
    })
    .catch((erro) => {
      console.log(erro);
    });
}

exbirInfoUsuario();