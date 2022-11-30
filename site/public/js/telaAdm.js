
var imgVar = "";
function transformarBase64() {
  var lerImagem = new FileReader();
  lerImagem.onload = (arquivo) => {
    imgVar = arquivo.target.result;
    imgFile.src=imgVar;
    imgFile.style.width="100%"
    imgFile.style.height="100%"
  };
  lerImagem.readAsDataURL(image.files[0]);
}

function cadastrarLivro() {
  var dtLancVar = in_data.value;
  var tituloVar = in_titulo.value;
  var autorVar = in_autor.value;
  var descricaoVar = in_descricao.value;
  var urlVar = in_url.value;
  var generoVar = in_genero.value;
  var fkUsuario =JSON.parse( sessionStorage.getItem("INFO_USUARIO"))[0].idUsuario
  console.log(dtLancVar)



  fetch("/livro/cadastrarLivro", {
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
      urlServer:urlVar,
      generoServer:generoVar,
      fkUsuarioServer: fkUsuario,
    }),
  })
    .then((resposta) => {
      console.log("Funcionou" + resposta)
      ;
    })

    .catch((resposta) => {
      console.log("Não funcionou" + resposta);
    });
}