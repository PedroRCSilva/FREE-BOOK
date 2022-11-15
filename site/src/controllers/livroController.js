var livroModel = require("../models/livroModel");

var sessoes = [];

function buscarLivro(req, res) {
  console.log("CHEGOU DADOS");
  livroModel
    .buscarLivro()
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log("Erro na consulta" + erro);
    });
}

function buscarLivroSelecionado(req, res) {
  var idLivro = req.body.idServer;
  console.log("CHEGOU DADOS");
  livroModel
    .buscarLivroSelecionado(idLivro)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log("Erro na consulta" + erro);
    });
}

function cadastrarLivro(req, res) {
  var titulo = req.body.tituloServer;
  var autor = req.body.autorServer;
  var dtLanc = req.body.dtLancServer;
  var img = req.body.imgServer;
  var descricao = req.body.descricaoServer;
  var fkUsuario = req.body.fkUsuarioServer;

  livroModel
    .cadastrarLivro(titulo, autor, dtLanc, img, descricao, fkUsuario)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((resultado) => {
      console.log("Erro ao cadastrar livro" + resultado);
    });
}

function atualizarDownloads(req, res) {
var idLivro = req.params.idLivro;
  livroModel
    .atualizarDownloads(idLivro)
    .then((result) => {
      console.log(result);
    })
    .catch((erro) => {
      console.log(erro);
    });
}
module.exports = {
  cadastrarLivro,
  buscarLivro,
  buscarLivroSelecionado,
  atualizarDownloads,
};
