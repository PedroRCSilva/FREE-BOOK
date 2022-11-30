function modalErro(frase1,frase2){
  var divValidacao = document.querySelector(".validacao");
  var textModal = document.querySelector(".textModal");
  var textValidacao = document.querySelector(".span");
  textModal.innerHTML=frase1;
  textValidacao.innerHTML=frase2;
  divValidacao.classList.add("active");
  setTimeout(()=>{
    divValidacao.classList.remove("active");
  },3000)
}

function modalSucesso(frase1,frase2){
  var divValidacao = document.querySelector(".validacao");
  var textModal = document.querySelector(".textModal");
  var textValidacao = document.querySelector(".span");

  textModal.innerHTML=frase1;
  textModal.style.background="green";
  textModal.style.color="white";
  textModal.style.fontSize="1.1em";
  textValidacao.innerHTML=frase2;

  divValidacao.classList.add("active");
  setTimeout(()=>{
    divValidacao.classList.remove("active");
  },3000)
}

function login(){
  var emailVar = user.value;
  var senhaVar = password.value;

  if (emailVar != "" && senhaVar != "") {
    fetch("/usuarios/autenticarRoot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log(resposta)
        if (resposta.ok) {
          resposta.json().then(function (json) {
            sessionStorage.setItem("INFO_USUARIO", JSON.stringify(json));
              modalSucesso("ACESSO PERMITIDO","CARREGANDO CONFIGURAÇÕES");
            setTimeout(() => {
              window.location = "telaAdm.html";
            }, 2000);
          });
        } else {
          modalErro("ERRO","ACESSO NÃO PERMITIDO!");
          ;
        }
      })

      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  } else {
    modalErro("Erro","Informe o email e a senha")
    ;
  }

}