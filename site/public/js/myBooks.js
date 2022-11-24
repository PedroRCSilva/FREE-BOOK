var idUsuario = JSON.parse(sessionStorage.getItem("INFO_USUARIO")).idUsuario;
  fetch(`/usuarios/listarLivro/${idUsuario}`,{
    method:"GET",
    headers:{
      "Content-type":"application/json"
    }
  }).then((resposta)=>{
    resposta.json().then((json)=>{
      const loading = document.querySelector(".loading");
        var divLivros = document.querySelector(".group-book");
        console.log("Aeeeeeeeeeeee")
        console.log(json)
        for (var i = 0; i < json.length; i++) {
          divLivros.innerHTML += `<div class="content-book"  onclick="verDescricaoCompleta(${json[i].idLivro})">
              <div class="img">
                <img src="${json[i].img}" alt="">
              </div>
              <div class="content-book-text">
                <h2>${json[i].titulo}</h2>
                <h3>${json[i].autor}</h3>
                <button onclick="verDescricaoCompleta(${json[i].idLivro})">Download</button></a>
              </div>
            </div>`;
        }
        loading.style.display = "none";
      });
    })
.catch((erro)=>{
    console.log(erro)
  })

  function verDescricaoCompleta(id) {
    sessionStorage.setItem("BOOK", id);
    setTimeout(() => {
      window.location = "info-book.html";
    });
  }
