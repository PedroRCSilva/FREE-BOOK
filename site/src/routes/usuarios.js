var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
  usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
  usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.get("/listarLivro/:idUsuario", (req, res) => {
  usuarioController.listarLivros(req, res);
});
router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.entrar(req, res);
});

router.get("/qtdLivro/:idUsuario", function (req, res) {
  usuarioController.exibirQtdLivros(req, res);
});

router.get("/usuarioTopDownloads", (req, res) => {
  usuarioController.downloadTopUsuarioController(req, res);
});

router.get("/totalDownloads/:idUsuario", (req, res) => {
  usuarioController.quantidadeTotalDownloadsController(req, res);
});

router.get("/contasAtivas", (req, res) => {
  usuarioController.contaAtivasController(req, res);
});

module.exports = router;
