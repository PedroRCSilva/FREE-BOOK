var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
  usuarioModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        // transforma JSON em String

        if (resultado.length == 1) {
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })

      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var sobrenome = req.body.sobrenomeServer;
  var img = req.body.imgServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Seu sobrenome está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha, sobrenome, img)
      .then(function (resultado) {
        res.json(resultado);
      })

      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarLivros(req, res) {
  var idUsuario = req.params.idUsuario;
  usuarioModel
    .listarLivros(idUsuario)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      res.status(400).send()
    });
}

function exibirQtdLivros(req, res) {
  var idUsuario = req.params.idUsuario;
  usuarioModel
    .QuantidadeLivros(idUsuario)
    .then((json) => {
      res.json(json);
    })
    .catch((erro) => {
      res.status(400).send()
    });
}

function contaAtivasController(req,res){
  usuarioModel.contaAtivas().then((resposta)=>{
    res.json(resposta)
  }).catch((erro)=>{
    res.status(400).send()
  });
}

function quantidadeTotalDownloadsController(req,res){
  var idUsuario = req.params.idUsuario;
  usuarioModel.quantidadeTotalDownloads(idUsuario).then((resposta)=>{
  res.json(resposta)
  }).catch((erro)=>{
    res.status(400).send("ERRO")
  })
  ;
}

function downloadTopUsuarioController(req,res){
  usuarioModel.downloadsTopUsuario().then((resposta)=>{
   res.json(resposta)
  }).catch((erro)=>{
    res.status(400).send()
  });
  ;
}

function usuarioRoot(req,res){
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  usuarioModel.usuarioRoot(email,senha).then((resposta)=>{
 
      if(resposta.length==1){
        res.json(resposta);
      }
      else if(resposta.length>1){
        res.status(403).send("Mais de um usuário com o mesmo login");
      }
      else{
        res.status(403).send("EMAIL E SENHA INCORRETOS");
      }
    }).catch((erro)=>{
      res.status(400).send();
    })
  }

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  listarLivros,
  exibirQtdLivros,
  quantidadeTotalDownloadsController,
  downloadTopUsuarioController,
  contaAtivasController,
  usuarioRoot
};
