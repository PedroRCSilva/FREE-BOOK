var metricaModel = require("../models/metricaModel");

function atualizarData(req, res) {
  var idUsuario = req.body.idUsuarioServer;
  var dtMetrica = req.body.dtMetricaServer;

  metricaModel
    .atualizarDtMetrica(idUsuario, dtMetrica)
    .then((resultado) => {
      console.log(resultado);
    })
    .catch((erro) => {
      console.log("ERRO AO ATUALIZAR A MÉTRICA" + erro);
    });
}

function atualizarVisita(req, res) {
  var idUsuario = req.params.idUsuario;
  console.log(idUsuario);
  metricaModel.atualizarVisitaMetrica(idUsuario);
}

function exibirMedidas(req, res) {
  var idUsuario = req.params.idUsuario;
  metricaModel.exibirMedidas(idUsuario).then((resultado) => {
    res.json(resultado);
  });
}
function criarMetrica(req, res) {
  var email = req.body.emailVar;
  var data = req.body.dataVar;
  console.log("CHEGUEI NA CONTROLLER CRIAR METRICA");
  metricaModel.criarMetrica(email, data);
}

module.exports = {
  atualizarData,
  atualizarVisita,
  exibirMedidas,
  criarMetrica,
};
