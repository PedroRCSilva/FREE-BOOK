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
  if (contStep < stepEtapa.length - 1) {
    contStep++;
    stepEtapa[contStep - 1].classList.remove("active");
    stepEtapa[contStep].classList.add("active");
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
    console.log(arquivo.target.result);
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
      console.log("resposta: ", resposta);
      boll.classList.remove("active");

      if (resposta.ok) {
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
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
      resposta.json().then(function (json) {
        sessionStorage.setItem("INFO_USUARIO", JSON.stringify(json));
        setTimeout(() => {
          window.location = "dashboard-book.html";
        }, 1000);
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

transitionLoginCadastro();
