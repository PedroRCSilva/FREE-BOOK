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


dadosLivroGenero();
dadosTopUsuario();
