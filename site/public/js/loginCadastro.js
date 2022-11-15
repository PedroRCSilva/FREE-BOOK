function transitionLoginCadastro() {
  const boll = document.querySelector(".bool");
  const btn = document.querySelectorAll(".btn");
  for (key of btn) {
    key.addEventListener("click", () => {
      boll.classList.toggle("active");
    });
  }
}

const stepEtapa = document.querySelectorAll(".etapa");
let contStep = 0;


function proximaEtapa() {
  var nomeVar = in_nome.value;
  var sobrenomeVar = in_sobrenome.value;
  var emailVar = in_email.value;
  var senhaVar = in_senha.value;
  var confSenha = in_confSenha.value;
  var imgVar = in_img.files;
  var divValidacao=document.querySelectorAll(".validacao")
  var validacao =true;

  var validacaoEmail = /([a-z0-9]{5,10}\.{0,1}[a-z0-9]+@{1}[a-z]{1}[a-z]{2,20}\.[a-z]{1,10})/ 

if(contStep==0 && nomeVar=="" ||   sobrenomeVar==""){
  validacao=false;
  divValidacao[0].innerHTML="OS CAMPOS DO NOME NÃO PODEM SER VAZIOS !";
  
}



if(contStep==1 && !validacaoEmail.test(emailVar)){
  validacao=false;
  divValidacao[1].innerHTML="EMAIL INVALIDO! CERTIFIQUE-SE QUE<BR> SEU EMAIL SEGUE ESSA ESTRUTURA nome@example.com  ";
}

if(contStep==2 && senhaVar.length<=8){
  divValidacao[2].innerHTML="A SENHA DEVE TER MAIS DE 8 CARACTERES ";
  validacao=false;
}

if ( confSenha!=senhaVar && validacao==true ){
  divValidacao[2].innerHTML="AS SENHAS NÃO COINCIDEM";
  validacao=false;
  
}

  if (contStep < stepEtapa.length - 1 && validacao) {
    contStep++;
    stepEtapa[contStep - 1].classList.remove("active");
    stepEtapa[contStep].classList.add("active");
    divValidacao.forEach(element => {
      element.innerHTML="";
    });
  }
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
    imgLoading.style.display='block';
    imgEntrada.style.display='none';
    imgLoading.src=imgVar;

  });
  receberImagem.readAsDataURL(imagemInput);
}



function cadastrar() {
  var nomeVar = in_nome.value;
  var sobrenomeVar = in_sobrenome.value;
  var emailVar = in_email.value;
  var senhaVar = in_senha.value;
  var confSenha = in_confSenha.value;
  const boll = document.querySelector(".bool");

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
    }),
  })

    .then(function (resposta) {
      
      if (resposta.ok) {
        console.log("resposta: ", resposta);
        boll.classList.remove("active");
       
      }else{
        resposta.text().then((text)=>{
          alert("USUÁRIO JÁ CADASTRADO")
        })
      }
    })

    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}


function login() {
  var emailVar = in_email_login.value;
  var senhaVar = in_senha_login.value;

  
  
  
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
        if(resposta.ok){
      resposta.json().then(function (json) {
    
        sessionStorage.setItem("INFO_USUARIO", JSON.stringify(json));
        
        var idUsuario =JSON.parse(sessionStorage.getItem("INFO_USUARIO")).idUsuario;
        
        fetch(`/medidas/atualizarVisita/${idUsuario}`,{
          method:"PUT",
          headers:{
            "Content-Type": "application/json",
          }
        }).then((resposta)=>{
          console.log(resposta);
        }).catch((erro)=>{
          console.log(erro)
        })

        setTimeout(() => {
          window.location = "dashboard-book.html";
        }, 1000);
      });
    }else{
      resposta.text().then((text)=>{
       alert(text)
      })
     
    }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      console.log("Vai")
    });
}

transitionLoginCadastro();
