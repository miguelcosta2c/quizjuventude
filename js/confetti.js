const confettiContainer = document.getElementById("confetti-container");

// Gera uma cor hexadecimal aleatória
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Cria e anima os confetes de forma mais dinâmica
function criarConfete(originX, originY, corner) {
  const confete = document.createElement("div");
  confete.className = "confetti";
  confete.style.backgroundColor = getRandomColor();

  // Define o tamanho e a duração aleatórios
  const size = Math.random() * 10 + 5; // De 5px a 15px
  const duration = Math.random() * 1.5 + 1.5; // De 1.5s a 3s
  const delay = Math.random() * 0.5; // Atraso de 0s a 0.5s

  confete.style.width = `${size}px`;
  confete.style.height = `${size}px`;
  confete.style.animationDuration = `${duration}s`;
  confete.style.animationDelay = `${delay}s`;

  // Posição inicial do confete
  confete.style.top = `${originY}px`;
  confete.style.left = `${originX}px`;

  // Calcula o ponto final da animação com base no canto de origem
  let endX, endY;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (corner) {
    case "top-left":
      endX = Math.random() * viewportWidth;
      endY = viewportHeight;
      break;
    case "top-right":
      endX = Math.random() * viewportWidth;
      endY = viewportHeight;
      break;
    case "bottom-left":
      endX = Math.random() * viewportWidth;
      endY = 0;
      break;
    case "bottom-right":
      endX = Math.random() * viewportWidth;
      endY = 0;
      break;
  }

  // Define a rotação final aleatória
  const rotation = Math.random() * 720;

  // Aplica as variáveis CSS
  confete.style.setProperty("--end-x", `${endX - originX}px`);
  confete.style.setProperty("--end-y", `${endY - originY}px`);
  confete.style.setProperty("--rotation-deg", `${rotation}deg`);
  confete.style.animationName = "confetti-fall";

  confettiContainer.appendChild(confete);

  // Remove o confete da DOM após a animação
  setTimeout(() => {
    confete.remove();
  }, (duration + delay) * 1000);
}

// Dispara os confetes de todos os cantos
function dispararConfetes() {
  // Limpa confetes anteriores
  confettiContainer.innerHTML = "";

  const totalConfetes = 200; // Aumentei a quantidade
  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  for (let i = 0; i < totalConfetes; i++) {
    const corner = corners[Math.floor(Math.random() * corners.length)];
    let originX, originY;

    // Define a origem do confete com base no canto
    switch (corner) {
      case "top-left":
        originX = 0;
        originY = 0;
        break;
      case "top-right":
        originX = viewportWidth;
        originY = 0;
        break;
      case "bottom-left":
        originX = 0;
        originY = viewportHeight;
        break;
      case "bottom-right":
        originX = viewportWidth;
        originY = viewportHeight;
        break;
    }

    criarConfete(originX, originY, corner);
  }
}
