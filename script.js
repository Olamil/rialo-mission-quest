// ===================
// Wallet Connect
// ===================
const connectButton = document.getElementById("connectWallet");
const walletAddressDisplay = document.getElementById("walletAddress");

connectButton.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      walletAddressDisplay.textContent = `Connected: ${account}`;
    } catch (error) {
      console.error(error);
      walletAddressDisplay.textContent = "❌ Wallet connection failed";
    }
  } else {
    walletAddressDisplay.textContent = "🦊 Install MetaMask!";
  }
});

// ===================
// Game Logic
// ===================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 240, y: 240, size: 20, speed: 5 };
let orbs = [];
let score = 0;
let missions = 0;
const missionText = document.getElementById("missionText");
const scoreBoard = document.getElementById("scoreBoard");

const missionMessages = [
  "Mission 1: Rialo bridges Web2 and Web3.",
  "Mission 2: Rialo triggers actions from data events.",
  "Mission 3: Real-time data ownership.",
  "Mission 4: Frictionless integration.",
  "Mission 5: Welcome to the future of Web3."
];

function spawnOrbs() {
  for (let i = 0; i < 5; i++) {
    orbs.push({
      x: Math.random() * (canvas.width - 20),
      y: Math.random() * (canvas.height - 20),
      size: 15
    });
  }
}
spawnOrbs();

function drawPlayer() {
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawOrbs() {
  ctx.fillStyle = "yellow";
  orbs.forEach(orb => {
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function checkCollision() {
  orbs = orbs.filter(orb => {
    const dx = player.x - orb.x;
    const dy = player.y - orb.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < player.size) {
      score += 10;
      missions++;
      scoreBoard.textContent = `Score: ${score} | Missions: ${missions}`;
      if (missions <= missionMessages.length) {
        missionText.textContent = missionMessages[missions - 1];
      }
      return false;
    }
    return true;
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawOrbs();
  checkCollision();
  requestAnimationFrame(update);
}

function movePlayer(e) {
  if (e.key === "ArrowUp") player.y -= player.speed;
  if (e.key === "ArrowDown") player.y += player.speed;
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
}
document.addEventListener("keydown", movePlayer);
update();
