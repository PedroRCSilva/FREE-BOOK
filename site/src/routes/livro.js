var express = require("express");
var router = express.Router();

var livroController = require("../controllers/livroController");
router.post("/cadastrarLivro",function(req,res){
  livroController.cadastrarLivro(req,res)
})

router.post("/livros",function(req,res){
  livroController.buscarLivro(req,res)
})

router.post("/buscarLivro",function(req,res){
  livroController.buscarLivroSelecionado(req,res)
})

module.exports= router;