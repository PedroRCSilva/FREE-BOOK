function plotarGrafico(){
  var cores = ["#264653", "#2A9D8F", "E9C46A", "#F4A261", "#E76F51"];
  var labelUsuario = ['Pedro','Murilo','Afonso'];
  var labelLivro = ['Pedro','Murilo','Afonso'];
  var dadosUsuario = [22,11,13]
  var dadosLivro = [22,33,22]
  const data = [
    {
      labels: labelUsuario,
      datasets: [
        {
          label: "Quantidade de Downloads",
          backgroundColor: cores,
          data: dadosUsuario,
        },
      ]
    },
    // SEGUNDO GRÁFICO 
    {
      labels: labelLivro,
      datasets: [
        {
          backgroundColor: cores,
          data: dadosLivro,
          hoverOffset: 4,
        }
      ]
    }
  ]

  const config = [
    // GRÁFICO DE BARRA 
    {
      type: "bar",
      data: data[0],
      options: {
        scales: {
          y: {
            suggestedMin: 10,
            suggestedMax: 100,
          },
        }
      }
    },
    // GRAFICO DE PIZZA 
    {
      type: "doughnut",
      data: data[1],
    },
  ];
  
  const graficoBar = new Chart(document.getElementById("graficBar"), config[0]);
  const graficPizza = new Chart(document.getElementById("graficPizza"),config[1]);
};


function dadosTopUsuario(){
  fetch("/usuarios/usuarioTopDownloads",{
    method:"GET",
    headers:{
      'Content-type':'Application/json'
    }
  }).then((res)=>{
    res.json().then((json)=>{
      console.log(json)
    })
  }).catch((erro)=>{
    console.log(erro);
  })
}

function buscarDadosLivro(){

}

function contabilizarContas(){

}

function contabilizarDownloads(){

}
dadosTopUsuario();
plotarGrafico();




