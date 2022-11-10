const progressCircle = document.querySelectorAll(".circle");
const progressCircleLine = document.querySelector(".line-progress");
const stepProgress = document.querySelectorAll(".campo");
const btnProx = document.querySelectorAll(".next");
const btnPrev = document.querySelectorAll(".prev ");
const lineProgress = document.querySelectorAll(".line");
const imgFile=document.querySelector(".input-select");
let etapaProgress = 0;

imgFile.addEventListener("click",()=>{
  image.click();
});


function avancar() {
  if (etapaProgress < progressCircle.length - 1) {
    etapaProgress++;
    progressCircle[etapaProgress].classList.add("active");
    stepProgress[etapaProgress - 1].classList.remove("active");
    stepProgress[etapaProgress].classList.add("active");
    progressCircleLine.style.height = `${
      Number(progressCircleLine.style.height.replaceAll("vh", "")) + 14
    }vh`;
    lineProgress[etapaProgress].classList.add("active");
  }
}

function retroceder() {
  if (etapaProgress > 0) {
    progressCircle[etapaProgress].classList.remove("active");
    stepProgress[etapaProgress].classList.remove("active");
    stepProgress[etapaProgress - 1].classList.add("active");
    progressCircleLine.style.height = `${
      Number(progressCircleLine.style.height.replaceAll("vh", "")) - 14
    }vh`;
    lineProgress[etapaProgress].classList.remove("active");
    etapaProgress--;
  }
}

btnProx.forEach((element, idx) => {
  element.addEventListener("click", () => {
    avancar();
    if (idx == btnProx.length - 1) {
    }
  });
});

btnPrev.forEach((element, idx) => {
  element.addEventListener("click", () => {
    retroceder();
  });
});
