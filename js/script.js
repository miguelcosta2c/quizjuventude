(function () {
  const headerTitle = document.querySelector(".headertitle");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupContent = document.querySelector(".popup-content");
  const popupText = document.querySelector(".popup-text");
  const closeBtn = document.querySelector(".close-btn");
  const mainDiv = document.querySelector("main");
  const tituloQuiz = headerTitle.textContent;

  let questions = getPerguntas();
  const numeroQuestoes = getPerguntas().length;

  let [acertos, contagem] = [0, 0];
  let responder = true;
  let rightAnswer;

  let answersArray = [];

  let playBtn = document.querySelector(".btn-vibrante");
  playBtn.addEventListener("click", quizMode);

  let jogando = false;

  closeBtn.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", function (e) {
    if (!popupContent.contains(e.target)) closePopup();
  });

  window.addEventListener("keydown", function (e) {
    if (!jogando) {
      if (e.key === "Enter" && popupOverlay.style.display === "none") {
        quizMode();
      } else if (
        ["Enter", "Escape", "Backspace"].includes(e.key) &&
        popupOverlay.style.display === "flex"
      ) {
        closePopup();
      }
      return;
    }

    switch (e.key) {
      case "1":
        selecionarResposta(1);
        break;
      case "2":
        selecionarResposta(2);
        break;
      case "3":
        selecionarResposta(3);
        break;
      case "4":
        selecionarResposta(4);
        break;
      case "Enter":
        confirmarResposta();
    }
  });

  function selecionarResposta(num) {
    if (!jogando || !responder) return;
    const selectedButton = answersArray[num - 1];
    const resto = [...answersArray].filter((item) => item !== selectedButton);
    selectedButton.classList.add("answerSelected");
    resto.forEach((item) => item.classList.remove("answerSelected"));
  }

  function quizMode() {
    jogando = true;
    contagem = 0;
    acertos = 0;
    questions = getPerguntas();
    playBtn.remove();
    headerTitle.style.fontSize = "1rem";

    // * configurar perguntas e respostas
    mostrarPergunta(questions);
  }

  function mostrarPergunta() {
    rightAnswer = undefined;
    contagem++;
    responder = true;
    const question = questions[0];
    const tituloPergunta = question.pergunta;
    const respostas = question.respostas;

    headerTitle.textContent = `${contagem}. ${tituloPergunta}`;
    criarRespostas(respostas);
  }

  function criarRespostas(respostas) {
    rightAnswer = questions[0].correta;
    answersArray = [];
    const answersDiv = document.createElement("section");
    answersDiv.classList.add("answers");
    mainDiv.appendChild(answersDiv);
    respostas.forEach((item, i) => {
      const answer = document.createElement("div");
      answer.classList.add("answer");
      answersDiv.appendChild(answer);
      const alternativas = ["A", "B", "C", "D"];
      answer.textContent = alternativas[i] + ". " + item;
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

    button.addEventListener("click", confirmarResposta);
    return answersArray;
  }

  function confirmarResposta() {
    if (!responder) return;
    responder = false;
    const selectedButton = getSelectedButton();
    const buttons = Array.from(document.querySelectorAll(".answer"));
    const indexSelectedButton = buttons.indexOf(selectedButton);

    if (selectedButton && indexSelectedButton === rightAnswer) {
      selectedButton.classList.add("answerCorrect");
      acertos++;
      dispararConfetes();
    } else if (selectedButton) {
      selectedButton.classList.add("answerWrong");
      buttons[rightAnswer].classList.add("answerCorrect");
    } else {
      responder = true;
      return answersArray;
    }
    // * proximo
    createLoadingBar();
    setTimeout(nextQuestionLB, 1000);
  }

  function nextQuestionLB() {
    const loadingBar = document.querySelector(".loading-bar");
    if (!loadingBar) return;
    loadingBar.classList.add("complete-loading-bar");
    setTimeout(nextQuestion, 2000);
  }

  function nextQuestion() {
    mainDiv.innerHTML = "";
    questions.shift();
    console.log(questions);
    if (!questions.length) {
      quizResult();
      return;
    }
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

  function openPopup() {
    popupOverlay.style.display = "flex";
  }

  function closePopup() {
    popupOverlay.style.display = "none";
  }

  function quizResult() {
    headerTitle.textContent = tituloQuiz;
    headerTitle.style.fontSize = "3.5rem";
    playBtn = document.createElement("button");
    playBtn.classList.add("btn-vibrante");
    playBtn.textContent = "Jogar Novamente";
    playBtn.addEventListener("click", quizMode);
    mainDiv.appendChild(playBtn);
    jogando = false;
    openPopup();
    popupText.innerHTML = `Acertos: ${acertos}/${numeroQuestoes}`;
  }
})();
