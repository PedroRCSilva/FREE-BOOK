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
        SELECT * FROM USUARIO WHERE EMAIL = '${email}' AND SENHA = sha2('${senha}',256);
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
        INSERT INTO USUARIO (nome, email, senha,sobrenome,img,tipoAcesso) VALUES ('${nome}', '${email}',sha2('${senha}',256),'${sobrenome}','${img}',"USER");
    `;
    console.log("Executando a instrução SQL: CADASTRO");
    return database.executar(instrucao);
}


function listarLivros(idUsuario){
    console.log("ENTREI NA MODEL LISTAR LIVROS, EXECUTANDO A INSTRUÇÃO");
    var instrucao = `SELECT * FROM USUARIO JOIN LIVRO ON IDUSUARIO=FKUSUARIO WHERE IDUSUARIO=${idUsuario};`
    return database.executar(instrucao);
}

function QuantidadeLivros(idUsuario){
    console.log("ENTREI NA MODEL QuantidadeLivros, EXECUTANDO A INSTRUÇÃO");
    var instrucao = `SELECT COUNT(LIVRO.TITULO) AS VALOR FROM USUARIO JOIN LIVRO ON IDUSUARIO=FKUSUARIO WHERE FKUSUARIO=${idUsuario};`;
    return database.executar(instrucao);
}

function downloadsTopUsuario(){
    console.log("ENTREI NA MODEL downloadsTopUsuario, EXECUTANDO A INSTRUÇÃO");

    var instrucao = `SELECT USUARIO.NOME, USUARIO.SOBRENOME,SUM(LIVRO.DOWNLOADS) as QUANTIDADE FROM USUARIO JOIN LIVRO ON IDUSUARIO=FKUSUARIO  WHERE tipoAcesso="USER" GROUP BY USUARIO.IDUSUARIO ORDER BY QUANTIDADE DESC LIMIT 6;`
    return database.executar(instrucao);
}

function quantidadeTotalDownloads(idUsuario){
console.log("ENTREI NA MODEL quantidadeTotalDownloads, EXECUTANDO A INSTRUÇÃO");
var instrucao = `SELECT SUM(LIVRO.downloads) as downloads FROM USUARIO JOIN LIVRO ON IDUSUARIO=FKUSUARIO WHERE USUARIO.IDUSUARIO=${idUsuario}`;

return database.executar(instrucao);
}

function contaAtivas(){
    console.log("ENTREI NA MODEL contaAtivas, EXECUTANDO A INSTRUÇÃO");
    var instrucao = "SELECT COUNT(IDUSUARIO) AS CONTAS FROM USUARIO";
    return database.executar(instrucao);

}
function usuarioRoot(email,senha){
    var instrucao=`SELECT * FROM USUARIO WHERE EMAIL='${email}' and senha=sha2('${senha}',256)and tipoAcesso="ROOT"`;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    listarLivros,
    QuantidadeLivros,
    quantidadeTotalDownloads,
    downloadsTopUsuario,
    contaAtivas,
    usuarioRoot,
};