var database = require("../database/config")

function atualizarDtMetrica(idUsuario,dtMetrica){
  var instrucao = `UPDATE METRICA SET DTMETRICA="${dtMetrica}" where FKUSUARIO=${idUsuario}`

  return database.executar(instrucao)
}

function atualizarVisitaMetrica(idUsuario){
  var instrucao = `UPDATE METRICA SET qtdVisita=qtdVisita+1 where FKUSUARIO=${idUsuario}`;

  return database.executar(instrucao)
}

function criarMetrica(email){
  var instrucao=`INSERT INTO METRICA(dtMetrica,qtdVisita,livrosPublicados,fkUsuario) VALUES(0,0,0,(SELECT IDUSUARIO FROM USUARIO WHERE email="${email}"));`
  return database.executar(instrucao)
}

function exibirMedidas(idUsuario){
  var instrucao = `SELECT * FROM METRICA`;
  return database.executar(instrucao)
}

module.exports={
  criarMetrica,
  atualizarDtMetrica,
  atualizarVisitaMetrica,
  exibirMedidas
}