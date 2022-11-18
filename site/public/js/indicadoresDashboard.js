function formatarData(data) {
  data = data.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/");
  return data;
}

function pegarMedidas() {
  var idUsuario = JSON.parse(sessionStorage.getItem("INFO_USUARIO")).idUsuario;
  fetch(`/medidas/listarMedida/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      resposta.json().then((json) => {
        console.log("EXIBA ERRO");
        div_data.innerHTML = formatarData(json[0].dtMetrica);
        qtdVisita.innerHTML = json[0].qtdVisita;
        pegarMedidasLivro(idUsuario);
      });
    })
    .catch((erro) => {
      console.log("ERRO" + erro);
    });
}

function pegarMedidasLivro(id) {
  fetch(`/usuarios/qtdLivro/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      resposta.json().then((json) => {
        console.log(json);
        livros.innerHTML = json[0].VALOR;
      });
    })
    .catch((erro) => {
      console.log(erro);
    });
}

pegarMedidas();
