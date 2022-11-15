var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function buscarLivro(req,res){
  console.log("CHEGOU DADOS")
  usuarioModel.buscarLivro().then((resultado)=>{
    res.json(resultado);
  })
  .catch((erro)=>{
    console.log("Erro na consulta"+erro);
  })
}

function buscarLivroSelecionado(req,res){
  var idLivro= req.body.idServer;
  console.log("CHEGOU DADOS")
  usuarioModel.buscarLivroSelecionado(idLivro).then((resultado)=>{
    res.json(resultado);
  })
  .catch((erro)=>{
    console.log("Erro na consulta"+erro);
  })
}

function cadastrarLivro(req, res) {
  var titulo = req.body.tituloServer;
  var autor = req.body.autorServer;
  var dtLanc = req.body.dtLancServer;
  var img = req.body.imgServer;
  var descricao = req.body.descricaoServer;
  var fkUsuario = req.body.fkUsuarioServer;

  usuarioModel.cadastrarLivro(titulo,autor,dtLanc,img,descricao,fkUsuario)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((resultado) => {
      console.log("Erro ao cadastrar livro"+resultado);
    });
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
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
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
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
        // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
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
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  cadastrarLivro,
  buscarLivro,
  buscarLivroSelecionado,
};
