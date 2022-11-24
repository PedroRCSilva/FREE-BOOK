var cores = ["#264653", "#2A9D8F", "E9C46A", "#F4A261", "#E76F51"];
function plotarGraficoBar(label, dados) {
  var labelUsuario = label;
  var dadosUsuario = dados;
  console.log(labelUsuario, dadosUsuario);
  const data = {
    labels: labelUsuario,
    datasets: [
      {
        label: "Quantidade de Downloads",
        backgroundColor: cores,
        data: dadosUsuario,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          min: 0,
          max: 50,
        },
      },
    },
  };
  return new Chart(document.getElementById("graficBar"), config);
}

function plotarGraficoPizza(label, dados) {
  var labelLivro = label;
  var dadosLivro = dados;
  const data = {
    labels: labelLivro,
    datasets: [
      {
        backgroundColor: cores,
        data: dadosLivro,
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
  };
  return new Chart(document.getElementById("graficPizza"), config);
}

function dadosTopUsuario() {
  fetch("/usuarios/usuarioTopDownloads", {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => {
      res.json().then((json) => {
        var nomes = [];
        var dados = [];
        for (var i = 0; i < json.length; i++) {
          nomes.push(`${json[i].NOME} ${json[i].SOBRENOME}`);
          dados.push(json[i].QUANTIDADE);
          console.log(nomes, dados);
        }
        plotarGraficoBar(nomes, dados);
      });
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function dadosLivroGenero() {
  fetch("/livro/porcentagemLivro", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    res.json().then((json) => {
      var genero = [];
      var dados = [];
      for (var i = 0; i < json.length; i++) {
        genero.push(json[i].GENERO);
        dados.push(json[i].QUANTIDADE);
        console.log(genero, dados);
      }
      plotarGraficoPizza(genero, dados);
    });
  });
}



  btnAnalise.addEventListener("click",()=>{
    const divAnalise = document.querySelector("body");
    if(window.scrollX==0){
      console.log("Teste");
    window.scroll(divAnalise.clientWidth,0);
    
    }
    else{
      window.scroll(0,0);
    }
  })

  function criarTopLivro(objeto){
    var divBooks=document.querySelector(".books");
    for(var i =0; i<objeto.length;i++){
    divBooks.innerHTML+=
    `<div class="book">
    <img src=${objeto[i].img} alt="">
    <div class="info-book">
      <h2>${objeto[i].titulo}</h2>
      <h3>${objeto[i].autor}</h3>
      <button onclick="verDescricaoCompleta(${objeto[i].idLivro})">Saiba mais</button>
    </div>
  </div>`
}
  }

  function books(){
    const book = document.querySelectorAll(".book");
    const infoBook = document.querySelectorAll(".info-book")
   book.forEach((element,idx) => {
    element.addEventListener("mouseover",()=>{
      infoBook[idx].style.opacity="1";
      infoBook[idx].style.width=infoBook[idx].scrollWidth + "px";
    });
    element.addEventListener("mouseout",()=>{
      infoBook[idx].style.opacity="0";
      infoBook[idx].style.width=0;
    });
   });
  }
  
  function topLivro(){
    fetch("/livro/topLivro",{
      method:'GET',
      headers:{
        'Content-type':'application/json'
      }
    }).then((resposta)=>{
      resposta.json().then((json)=>{
      criarTopLivro(json);
      books()
      })
    }).catch((erro)=>{
      console.log(erro)
    })
  }
  window.scroll(0,0);
  topLivro();
  dadosLivroGenero();
  dadosTopUsuario();
  


  
