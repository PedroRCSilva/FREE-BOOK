var database = require("../database/config");

function cadastrarLivro(titulo,autor,dtLanc,img,descricao,link,fkUsuario,genero){
  console.log("ACESSEI A USUÁRIO MODEL REGISTRANDO USUÁRIO")
  var instrucao = `INSERT INTO LIVRO(titulo,autor,dtLanc,img,descricao,fkUsuario,url,downloads,genero) VALUES ('${titulo}','${autor}','${dtLanc}','${img}','${descricao}','${fkUsuario}','${link}',0,'${genero}');`;
  console.log("EXECUTANDO INSTRUÇÃO"+instrucao)
  return database.executar(instrucao);
}

function buscarLivro(){
console.log("Buscando livros");
var instrucao = 'SELECT * FROM LIVRO;'
return database.executar(instrucao)
}

function buscarLivroSelecionado(id){
  console.log("Buscar Livro"+id);
  var instrucao = `SELECT * FROM LIVRO WHERE IDLIVRO=${id}`;
  return database.executar(instrucao)
}

function atualizarDownloads(idLivro){
  var instrucao = `UPDATE LIVRO SET downloads=downloads+1 where idLivro=${idLivro};`;
  return database.executar(instrucao)
}
module.exports =
{
  cadastrarLivro,
  buscarLivro,
  buscarLivroSelecionado,
  atualizarDownloads,
}