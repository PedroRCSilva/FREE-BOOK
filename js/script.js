const formCadastro=document.querySelector(".cadastro");
const formLogin = document.querySelector(".login");
const boll = document.querySelector(".bool")
const imgVector = document.querySelector(".img");
const btn= document.querySelectorAll(".btn");
const contentText= document.querySelector(".text");
const div=document.querySelector(".principal .container")
const img = document.querySelector(".content-img");
const carrossel = document.querySelector(".session-carrossel div");
const groupWidth = document.querySelector(".group");
const btnCarrossel=document.querySelectorAll(".session-carrossel .btn");
let validacao=true;
var intervalCarrossel=setInterval(proximoCarrossel,3000);


for (key of btn){
key.addEventListener("click",()=>{
  boll.classList.toggle("active");
})
}




function proximoCarrossel(){
  if(carrossel.scrollWidth>carrossel.scrollLeft+1349&&validacao){
    carrossel.scrollLeft+=carrossel.clientWidth+20;
  }
}

function anteriorCarrossel(){
    carrossel.scrollLeft-=carrossel.clientWidth+20;
    if(carrossel.scrollLeft==0){
      validacao=true;
    }
}


btnCarrossel[0].addEventListener("click",anteriorCarrossel);
btnCarrossel[1].addEventListener("click",proximoCarrossel);



