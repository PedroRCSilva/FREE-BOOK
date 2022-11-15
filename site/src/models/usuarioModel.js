var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha,sobrenome,img) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha,sobrenome,img) VALUES ('${nome}', '${email}', '${senha}','${sobrenome}','${img}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarLivros(idUsuario){
    var instrucao = `SELECT LIVROS.img,LIVROS.descricao,LIVROS.titulo,LIVROS.autor,livros.dtLanc FROM USUARIO JOIN LIVROS ON IDUSUARIO=FKUSUARIO WHERE IDUSUARIO=${idUsuario};`
    return database.executar(instrucao);
}

function QuantidadeLivros(idUsuario){
    var instrucao = `SELECT COUNT(LIVROS.TITULO) AS VALOR FROM USUARIO JOIN LIVROS ON IDUSUARIO = FKUSUARIO WHERE IDUSUARIO=${idUsuario};`;
return database.executar(instrucao);
}

'                                                                                                                                       '
module.exports = {
    entrar,
    cadastrar,
    listar,
    listarLivros,
    QuantidadeLivros
};