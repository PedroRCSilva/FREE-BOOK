var nome = document.querySelector(".nome span");
img_perfil.src = JSON.parse(sessionStorage.getItem("INFO_USUARIO")).img;
nome.innerHTML =
  JSON.parse(sessionStorage.getItem("INFO_USUARIO")).nome +
  " " +
  JSON.parse(sessionStorage.getItem("INFO_USUARIO")).sobrenome;
var idLivro = sessionStorage.getItem("BOOK");
fetch("livro/buscarLivro", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    idServer: idLivro,
  }),
})
  .then((resultado) => {
    resultado.json().then((json) => {
      console.log(json);
      descricao.innerHTML = json[0].descricao;
      autor.innerHTML = json[0].autor;
      titulo.innerHTML = json[0].titulo;
      data.innerHTML = json[0].dtLanc;
      imgLivro.src = json[0].img;
    });
  })
  .catch((erro) => {
    console.log("ERRO NA REQUISICAO" + erro);
  });
