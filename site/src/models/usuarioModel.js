var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    // console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM USUARIO WHERE EMAIL = '${email}' AND SENHA = '${senha}';
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
        INSERT INTO USUARIO (nome, email, senha,sobrenome,img) VALUES ('${nome}', '${email}', '${senha}','${sobrenome}','${img}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarLivros(idUsuario){
    var instrucao = `SELECT LIVRO.img,LIVRO.descricao,LIVRO.titulo,LIVRO.autor,LIVRO.dtLanc FROM USUARIO JOIN LIVRO ON IDUSUARIO=FKUSUARIO WHERE IDUSUARIO=${idUsuario};`
    return database.executar(instrucao);
}

function QuantidadeLivros(idUsuario){
    var instrucao = `SELECT COUNT(LIVRO.TITULO) AS VALOR FROM USUARIO JOIN LIVRO ON IDUSUARIO=FKUSUARIO WHERE FKUSUARIO=${idUsuario};`;
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