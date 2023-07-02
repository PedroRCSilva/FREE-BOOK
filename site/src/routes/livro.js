var express = require("express");
const multer = require("multer");
var router = express.Router();
var livroController = require("../controllers/livroController");
const upload = multer({dest:"./uploads",limits:{ fieldSize: 10 * 1024 * 1024 }})

router.post("/cadastrarLivro",upload.single("pdf"),function(req,res){
  livroController.cadastrarLivro(req,res)

})
router.get("/livros",function(req,res){
  livroController.buscarLivro(req,res)
})

router.get("/buscarLivro/:id",function(req,res){
  livroController.buscarLivroSelecionado(req,res)
})

router.put("/atualizarLivro/:idLivro",function(req,res){
  livroController.atualizarDownloads(req,res);
})

router.get("/porcentagemLivro/",(req,res)=>{
  livroController.porcentagemLivroGeneroController(req,res);
})

router.get("/topLivro",(req,res)=>{
  livroController.livroTopDownloadsController(req,res);
})

router.get("/totalPlataforma",(req,res)=>{
  livroController.totalDownloadsPlataforma(req,res);
})

router.get("/download/:id",(req,res)=>{
livroController.realizarDownload(req,res);
})

module.exports= router;