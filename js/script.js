(function () {
  const playBtn = document.querySelector(".btn-vibrante");
  const headerTitle = document.querySelector(".headertitle");
  const header = document.querySelector("header");
  const mainDiv = document.querySelector("main");

  const questions = getPerguntas();

  let responder = true;

  playBtn.addEventListener("click", function (e) {
    quizMode();
  });

  function quizMode() {
    playBtn.remove();
    headerTitle.style.fontSize = "1rem";

    // * configurar perguntas e respostas
    mostrarPergunta(questions);
  }

  function mostrarPergunta() {
    responder = true;
    const question = questions[0];
    const tituloPergunta = question.pergunta;
    const respostas = question.respostas;

    headerTitle.textContent = tituloPergunta;
    const answers = criarRespostas(respostas);
  }

  function criarRespostas(respostas) {
    let rightAnswer = questions[0].correta;
    const answersArray = [];
    const answersDiv = document.createElement("section");
    answersDiv.classList.add("answers");
    mainDiv.appendChild(answersDiv);
    respostas.forEach((item) => {
      const answer = document.createElement("div");
      answer.classList.add("answer");
      answersDiv.appendChild(answer);
      answer.textContent = item;
      answersArray.push(answer);
    });
    answersArray.forEach((ans) => {
      ans.addEventListener("click", function (e) {
        if (!responder) return;
        // configuração da cor de cada botão quando ativo ou não
        const resto = [...answersArray].filter((item) => item !== ans);
        ans.classList.add("answerSelected");
        resto.forEach((item) => item.classList.remove("answerSelected"));
      });
    });
    const button = confirmButton();

    // * botão de confirmar

    button.addEventListener("click", (e) => {
      if (!responder) return;
      responder = false;
      const selectedButton = getSelectedButton();
      const buttons = Array.from(document.querySelectorAll(".answer"));
      const indexSelectedButton = buttons.indexOf(selectedButton);

      if (selectedButton && indexSelectedButton === rightAnswer) {
        selectedButton.classList.add("answerCorrect");
        dispararConfetes();
      } else if (selectedButton) {
        selectedButton.classList.add("answerWrong");
        buttons[rightAnswer].classList.add("answerCorrect");
      } else {
        responder = true;
        return answersArray;
      }
      // * proximo
      const loadingBar = createLoadingBar();
      setTimeout(nextQuestionLB, 1000);
    });
    return answersArray;
  }

  function nextQuestionLB() {
    const loadingBar = document.querySelector(".loading-bar");
    if (!loadingBar) return;
    loadingBar.classList.add("complete-loading-bar");
    setTimeout(nextQuestion, 2000);
  }

  function nextQuestion() {
    questions.shift();
    if (questions.length === 0) return;
    mainDiv.innerHTML = "";
    mostrarPergunta();
  }

  function confirmButton() {
    const button = document.createElement("button");
    button.classList.add("confirmButton");
    button.textContent = "Responder";
    mainDiv.appendChild(button);
    return button;
  }

  function getSelectedButton() {
    const buttons = document.querySelectorAll(".answer");
    let selectedButton = null;
    buttons.forEach((button) => {
      if (button.classList.contains("answerSelected")) {
        selectedButton = button;
      }
    });
    return selectedButton;
  }

  function createLoadingBar() {
    const loadingBarDiv = document.createElement("div");
    loadingBarDiv.classList.add("loading-bar-container");
    const loadingBar = document.createElement("div");
    loadingBar.classList.add("loading-bar");
    loadingBarDiv.appendChild(loadingBar);
    mainDiv.appendChild(loadingBarDiv);
    return loadingBar;
  }

  // function createPopUp() {
  //   const popUpOverlay = document.createElement("div")
  //   const popUp
  //   const body = document.querySelector("body")
  //   popUpOverlay.classList.add("popup-overlay")
  //   body.appendChild(popUpOverlay)
  // }
})();
