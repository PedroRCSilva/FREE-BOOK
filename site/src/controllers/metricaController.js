var metricaModel = require("../models/metricaModel");
var usuarioModel = require("../models/usuarioModel")

function atualizarData(req,res){
  var idUsuario = req.body.idUsuarioServer;
  var dtMetrica = req.body.dtMetricaServer;

  metricaModel.atualizarDtMetrica(idUsuario,dtMetrica)
  .then((resultado)=>{
  console.log(resultado)
  })
  .catch((erro)=>{
    console.log("ERRO AO ATUALIZAR A MÉTRICA"+erro)
  })
}

function atualizarVisita(req,res){
  var idUsuario = req.params.idUsuario;
  console.log(idUsuario)
  metricaModel.atualizarVisitaMetrica(idUsuario).then((res)=>{
    console.log(res);
  })
}

function exibirMedidas(req,res){
var idUsuario = req.params.idUsuario;
  metricaModel.exibirMedidas(idUsuario).then((resultado)=>{
    res.json(resultado)
  })
  .catch((erro)=>{
   console.log(erro)
  })
}




module.exports={
  atualizarData,
  atualizarVisita,
  exibirMedidas,

}