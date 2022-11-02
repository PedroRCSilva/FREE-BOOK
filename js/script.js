const formCadastro=document.querySelector(".cadastro");
const formLogin = document.querySelector(".login");
const boll = document.querySelector(".bool")
const imgVector = document.querySelector(".img");
const btn= document.querySelectorAll(".btn");
const contentText= document.querySelector(".text");
const div=document.querySelector(".principal .container")
const img = document.querySelector(".content-img");

btn[0].addEventListener("click",()=>{
  boll.classList.toggle("active");
})

btn[1].addEventListener("click",()=>{
  boll.classList.toggle("active");
})