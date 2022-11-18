

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
        var dataFormatada =json[0].dtLanc.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/");
        descricao.innerHTML = json[0].descricao;
        autor.innerHTML = json[0].autor;
        titulo.innerHTML = json[0].titulo;
        data.innerHTML = dataFormatada;
        imgLivro.src = json[0].img;
    })})
    .catch((erro) => {
      console.log("ERRO NA REQUISICAO" + erro);
    });

    
  function atualizarDownloads(){
    fetch(`livro/atualizarLivro/${idLivro}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
      }
    }).then((resposta)=>{
      console.log(resposta);
    }).catch((erro)=>{
      console.log(erro)
    })
  }
  const btn = document.querySelector("#url");
  btn.addEventListener("click",atualizarDownloads);
  

