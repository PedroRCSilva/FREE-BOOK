var database = require("../database/config");

function cadastrarLivro(titulo,autor,dtLanc,img,descricao,fkUsuario){
  console.log("ACESSEI A USUÁRIO MODEL REGISTRANDO USUÁRIO")
  var instrucao = `INSERT INTO LIVROS(titulo,autor,dtLanc,img,descricao,fkUsuario,downloads) VALUES ('${titulo}','${autor}','${dtLanc}','${img}','${descricao}','${fkUsuario}',0);`;

  console.log("EXECUTANDO INSTRUÇÃO"+instrucao)
  return database.executar(instrucao);
}

function buscarLivro(){
console.log("Buscando livros");
var instrucao = 'SELECT * FROM LIVROS;'
return database.executar(instrucao)
}

function buscarLivroSelecionado(id){
  console.log("Buscar Livro"+id);
  var instrucao = `SELECT * FROM LIVROS WHERE IDLIVRO=${id}`;
  return database.executar(instrucao)
}

function atualizarDownloads(idLivro){
  console.log("uiuiui")
  var instrucao = `UPDATE LIVROS SET downloads=downloads+1 where idLivro=${idLivro};`;
  return database.executar(instrucao)
}
module.exports =
{
  cadastrarLivro,
  buscarLivro,
  buscarLivroSelecionado,
  atualizarDownloads,
}