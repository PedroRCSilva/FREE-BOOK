function transitionLoginCadastro() {
  const boll = document.querySelector(".bool");
  const btn = document.querySelectorAll(".btn");
  for (key of btn) {
    key.addEventListener("click", () => {
      boll.classList.toggle("active");
    });
  }
}

transitionLoginCadastro();