
const path = require("path");
const livroModel = require("../models/livroModel");
const fs = require("fs");
const { json } = require("express");
var sessoes = [];

function buscarLivro(req, res) {
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
  var idLivro = req.params.id;
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
const {titulo,autor,dtLanc,img,descricao,fkUsuario,genero} = req.body;
const caminho = req.file.path;
console.log(caminho);
  livroModel
    .cadastrarLivro(
      titulo,
      autor,
      dtLanc,
      img,
      descricao,
      caminho,
      fkUsuario,
      genero
    )
    .then((resultado) => {
      res.status(200).json(resultado);
      
    })
    .catch((resultado) => {
      console.log("Erro ao cadastrar livro" + resultado);
      res.status(400).send();
    });

}

function atualizarDownloads(req, res) {
  var idLivro = req.params.idLivro;
  livroModel
    .atualizarDownloads(idLivro)
    .then((result) => {
      res.status(200).send();
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function livroTopDownloadsController(req,res) {
  livroModel.livroTopDownloads().then((resposta)=>{
    res.json(resposta)
  }).catch((erro)=>{
    console.log(erro.sqlMessage)
  });
}

function porcentagemLivroGeneroController(req,res) {
  livroModel.porcentagemLivroGenero().then((resposta)=>{
    res.json(resposta)
  }).catch((erro)=>{
    console.log(erro.sqlMessage)
  });
}

function totalDownloadsPlataforma(req,res){
  var idUsuario = req.params.idUsuario;
  livroModel.totalDownloadsPlataforma(idUsuario).then((resultado)=>{
    res.json(resultado);
  }).catch((erro)=>{
    console.log(erro)
  })
}

function realizarDownload(req,res){
  const idLivro = req.params.id;
  const requisicao = livroModel.buscarLivroSelecionado(idLivro)

  requisicao.then((resposta)=>{
    if(resposta.length>0){
        console.log(resposta);
        res.setHeader('Content-Disposition',`attachment;filename=${resposta[0].titulo}.pdf`)
        res.sendFile(path.resolve(resposta[0].caminho))
        return
    
    }
    return res.status(404).json({message:"Erro: Livro não encontrado"})
  })
  .catch((erro)=>{
    console.log(erro)
    return res.status(400).send(erro.sqlMessage)
  })
}



module.exports = {
  cadastrarLivro,
  buscarLivro,
  buscarLivroSelecionado,
  atualizarDownloads,
  livroTopDownloadsController,
  porcentagemLivroGeneroController,
  totalDownloadsPlataforma,
  realizarDownload
};
