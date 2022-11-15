fetch("/livro/livros", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resultado) => {
    const loading = document.querySelector(".loading");
    resultado.json().then((json) => {
      var divLivros = document.querySelector(".group-book");
      for (var i = 0; i < json.length; i++) {
        divLivros.innerHTML += `<div class="content-book"  onclick="verDescricaoCompleta(${json[i].idLivro})">
            <div class="img">
              <img src="${json[i].img}" alt="">
            </div>
            <div class="content-book-text">
              <h2>${json[i].titulo}</h2>
              <h3>${json[i].autor}</h3>
              <a href=""><button>Download</button></a>
            </div>
          </div>`;
      }
      loading.style.display = "none";
    });
  })
  .catch((erro) => {
    console.log("resultado" + erro);
  });

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

function verDescricaoCompleta(id) {
  sessionStorage.setItem("BOOK", id);
  setTimeout(() => {
    window.location = "info-book.html";
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
        data.innerHTML = json[0].dtMetrica
          .slice(0, 10)
          .replaceAll("-", "/")
          .split("/")
          .reverse()
          .join("/");
        qtdVisita.innerHTML = json[0].qtdVisita;
      });
    })
    .catch((erro) => {
      console.log(erro);
    });

  fetch(`/usuarios/qtdLivro/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      resposta.json().then((json) => {
        livros.innerHTML = json[0].VALOR;
      });
    })
    .catch((erro) => {
      console.log(erro);
    });
}

exbirInfoUsuario();
pegarMedidas();
