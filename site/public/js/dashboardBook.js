 
    fetch("/livro/livros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((resultado) => {
      resultado.json().then((json) => {
        var divLivros = document.querySelector(".group-book");
        for (var i = 0; i < json.length; i++) {
          divLivros.innerHTML +=
            `<div class="content-book"  onclick="verDescricaoCompleta(${json[i].idLivro})">
            <div class="img">
              <img src="${json[i].img}" alt="">
            </div>
            <div class="content-book-text">
              <h2>${json[i].titulo}</h2>
              <h3>${json[i].autor}</h3>
              <a href=""><button>Download</button></a>
            </div>
          </div>`
        }
      })
    })
      .catch((erro) => {
        console.log("resultado" + erro);
      })


    function exbirInfoUsuario() {
      var infoUsuario = JSON.parse(sessionStorage.getItem('INFO_USUARIO'))

  
      var image = img_perfil;
      var nome = document.querySelector(".nome span");
      nome.innerHTML = `${infoUsuario.nome} ${infoUsuario.sobrenome}`
      image.src = infoUsuario.img;
      
   
      
    }

    function sairSessao() {
      sessionStorage.clear();
      setTimeout(() => {
        window.location = "index.html";
      })
    }

    function verDescricaoCompleta(id){
      sessionStorage.setItem("BOOK",id);
      setTimeout(()=>{
        window.location="info-book.html";
      })
    }
  exbirInfoUsuario();