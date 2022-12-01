const stepEtapa = document.querySelectorAll(".etapa");
let contStep = 0;

function transitionLoginCadastro() {
  const boll = document.querySelector(".bool");
  const btn = document.querySelectorAll(".btn");
  for (key of btn) {
    key.addEventListener("click", () => {
      boll.classList.toggle("active");
    });
  }
}

function formatarData() {
  var dtMetrica = new Date();
  dtMetrica = dtMetrica
    .toLocaleDateString({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    console.log("Foi")
  dtMetrica = dtMetrica.slice(0, 10).replaceAll("/", "-").split("-").reverse().join("-");
  console.log(dtMetrica)
  return dtMetrica;
}

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
function proximaEtapa() {
  var nomeVar = in_nome.value;
  var sobrenomeVar = in_sobrenome.value;
  var emailVar = in_email.value;
  var senhaVar = in_senha.value;
  var confSenha = in_confSenha.value;
  var validacao = true;
  var validacaoEmail = /([a-z0-9]{5,10}\.{0,1}[a-z0-9]+@{1}[a-z]{1}[a-z]{2,20}\.[a-z]{1,10})/;

  if (contStep == 0 && (nomeVar == "" || sobrenomeVar == "")) {
    validacao = false;
    modalErro("ERRO","OS CAMPOS DO NOME NÃO PODEM SER VAZIOS !")
  }

  if (contStep == 1 && !validacaoEmail.test(emailVar)) {
      validacao = false;
      modalErro("ERRO","EMAIL INVALIDO! CERTIFIQUE-SE QUE<BR> SEU EMAIL SEGUE ESSA ESTRUTURA nome@example.com ")
  }

  if (contStep == 2 && senhaVar.length <= 8) {
    validacao = false;
    modalErro("ERRO","A SENHA DEVE TER MAIS DE 8 CARACTERES ")
  }

  if (confSenha != senhaVar && validacao == true) {
    validacao = false;
    modalErro("ERRO","AS SENHAS NÃO COINCIDEM")
  }

  if (contStep < stepEtapa.length - 1 && validacao) {
    stepEtapa[contStep].classList.remove("active");
    contStep++;
    stepEtapa[contStep].classList.add("active");
  }
}

function criarMetricaUsuario(email){
  console.log("ENTROU NA FUNÇÃO")
  fetch("/medidas/criarMetrica", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      emailVar : email,
      dataVar : formatarData(),
    })
  })
    .then((resposta) => {
      console.log(resposta)
      
    })
    .catch((resposta) => {
      console.log(`#ERRO: ${resposta}`);
    });
}

function voltaEtapa() {
  if (contStep >= 0) {
    contStep--;
    stepEtapa[contStep + 1].classList.remove("active");
    stepEtapa[contStep].classList.add("active");
  }
}

var imgVar = "";

function verImagem() {
  var imagemInput = in_img.files[0];
  var receberImagem = new FileReader();
  receberImagem.addEventListener("load", (arquivo) => {
    imgVar = arquivo.target.result;
    imgLoading.style.display = "block";
    imgEntrada.style.display = "none";
    imgLoading.src = imgVar;
  });
  receberImagem.readAsDataURL(imagemInput);
}

function atualizarVisita(id){
  fetch(`/medidas/atualizarVisita/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      console.log(resposta);
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function login() {
  var emailVar = in_email_login.value;
  var senhaVar = in_senha_login.value;

  if (emailVar != "" && senhaVar != "") {
    fetch("/usuarios/autenticar", {
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
        if (resposta.ok) {
          resposta.json().then(function (json) {
            sessionStorage.setItem("INFO_USUARIO", JSON.stringify(json));
            var idUsuario = JSON.parse(
              sessionStorage.getItem("INFO_USUARIO")
            ).idUsuario;

            atualizarVisita(idUsuario);
              modalSucesso("Usuário Encontrado!","Redirecionando para a tela de login");
            setTimeout(() => {
              window.location = "dashboard-book.html";
            }, 2000);

         
          });
        } else {
          modalErro("Usuário não encontrado!","Tenta outra vez");
          ;
        }
      })

      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        console.log("Vai");
      });
  } else {
    modalErro("Erro","Informe o email e a senha")
    ;
  }
}

transitionLoginCadastro();

function cadastrar() {
  var nomeVar = in_nome.value;
  var sobrenomeVar = in_sobrenome.value;
  var emailVar = in_email.value;
  var senhaVar = in_senha.value;
  const boll = document.querySelector(".bool");
  const textValidacao = document.querySelector(".span");
  var divValidacao = document.querySelector(".validacao");
  
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      sobrenomeServer: sobrenomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      imgServer: imgVar,
    })
  }).then((resposta)=>{
    if(resposta.ok){
      modalSucesso("CADASTRO REALIZADO COM SUCESSO!","Agora vamos fazer Login :)")
      criarMetricaUsuario(emailVar);
      setTimeout(()=>{
        boll.classList.remove("active")
      },2000)
      
    }
    else{
      modalErro("ERRO","USUÁRIO JÁ CADASTRADO")
    }
    })
  .catch((erro)=>{
    console.log(erro);
  })
}

function tipoLogin(){
  const boll = document.querySelector(".bool");
    boll.classList.toggle("active",sessionStorage.INFO_HOME=="CADASTRO");
  }
  
  tipoLogin();


