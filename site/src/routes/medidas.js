var express = require("express");
var router = express.Router();

var metricaController = require("../controllers/metricaController");

// router.get("/ultimas/:idAquario", function (req, res) {
//     medidaController.buscarUltimasMedidas(req, res);
// });

// router.get("/tempo-real/:idAquario", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })

router.put("/atualizarData",(req,res)=>{
  metricaController.atualizarData(req,res);
})

router.put("/atualizarVisita/:idUsuario",(req,res)=>{
  metricaController.atualizarVisita(req,res);
})

router.get("/listarMedida/:idUsuario",(req,res)=>{
  metricaController.exibirMedidas(req,res)
})

module.exports = router;