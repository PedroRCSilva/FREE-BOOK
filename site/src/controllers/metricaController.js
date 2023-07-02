var metricaModel = require("../models/metricaModel");

function atualizarData(req, res) {
  var idUsuario = req.body.idUsuarioServer;
  var dtMetrica = req.body.dtMetricaServer;

  metricaModel
    .atualizarDtMetrica(idUsuario, dtMetrica)
    .then((resultado) => {
      res.status(200).send()
    })
    .catch((erro) => {
      res.status(400).send();
    });
}

function atualizarVisita(req, res) {
  var idUsuario = req.params.idUsuario;
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
  metricaModel.criarMetrica(email, data);
}

module.exports = {
  atualizarData,
  atualizarVisita,
  exibirMedidas,
  criarMetrica,
};
