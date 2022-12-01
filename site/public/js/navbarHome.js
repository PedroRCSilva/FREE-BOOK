function colorNavbar(){
  const navbar= document.querySelector("header .container");
    navbar.classList.toggle("active",scrollY>=20);
  }
  
  window.addEventListener("scroll",()=>{
    colorNavbar()
  })