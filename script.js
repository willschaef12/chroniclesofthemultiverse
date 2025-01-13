/* =================================================
   ==========  CHARACTER & STORY DATA  ==========
   ================================================= */

// Available characters
const characters = [
  {
    name: "Loki",
    color: "green", // Red
    stats: {
      Strength: 7,
      Speed: 7,
      Intelligence: 10,
      Durability: 6,
      Magic: 10,
    },
  },
  {
    name: "Flash",
    color: "red", // Yellow
    stats: {
      Strength: 6,
      Speed: 10,
      Intelligence: 8,
      Durability: 5,
      Agility: 10,
    },
  },
  {
    name: "Scarlet Witch",
    color: "purple", // Purple
    stats: {
      Strength: 5,
      Speed: 6,
      Intelligence: 8,
      Durability: 5,
      Magic: 10,
    },
  },
  {
    name: "Silver Surfer",
    color: "silver", // Silver
    stats: {
      Strength: 10,
      Speed: 9,
      Intelligence: 9,
      Durability: 10,
      CosmicPower: 10,
    },
  },
  {
    name: "Star-Lord",
    color: "brown", // Blue
    stats: {
      Strength: 6,
      Speed: 8,
      Intelligence: 8,
      Durability: 6,
      Agility: 9,
      Leadership: 9,
    },
  },
];

// Fight variables
let selectedCharacter = null;
let playerHealth = 100;
let enemyHealth = 100;

// Canvas / movement
let canvas, ctx;
let player = { x: 50, y: 50, width: 20, height: 20, speed: 3 };
let enemy = { x: 300, y: 100, width: 20, height: 20 };
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

/* =================================================
   ==========   SCREEN TRANSITIONS   ==========
   ================================================= */

function goToCharacterSelection() {
  hideAllScreens();
  document.getElementById("character-selection-screen").classList.add("active");

  const container = document.getElementById("character-container");
  container.innerHTML = ""; // Clear any previous characters

  characters.forEach((ch) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <h2>${ch.name}</h2>
      <div id="character-stats">
        ${Object.entries(ch.stats)
          .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
          .join("")}
      </div>
    `;
    card.onclick = () => selectCharacter(ch.name);
    container.appendChild(card);
  });
}

function selectCharacter(characterName) {
  selectedCharacter = characters.find((c) => c.name === characterName);

  hideAllScreens();
  document.getElementById("loading-screen").classList.add("active");

  setTimeout(() => {
    document.getElementById("loading-screen").classList.remove("active");
    startFightScreen();
  }, 2000);
}

function startFightScreen() {
  hideAllScreens();
  document.getElementById("fight-screen").classList.add("active");

  // Reset HP
  playerHealth = 100;
  enemyHealth = 100;
  updateHealthDisplay();

  // Reset positions
  player.x = 50;
  player.y = 50;
  enemy.x = 300;
  enemy.y = 100;

  // Get canvas context
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Start the animation/game loop
  requestAnimationFrame(gameLoop);
}

function goToHome() {
  hideAllScreens();
  document.getElementById("home-screen").classList.add("active");
}

/* =================================================
   ==========   FIGHTING LOGIC   ==========
   ================================================= */

function drawRect(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function updatePositions() {
  if (keys.ArrowUp) player.y -= player.speed;
  if (keys.ArrowDown) player.y += player.speed;
  if (keys.ArrowLeft) player.x -= player.speed;
  if (keys.ArrowRight) player.x += player.speed;

  // Boundaries check
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePositions();

  // Draw the player's block with the selected hero's color
  const playerColor = selectedCharacter ? selectedCharacter.color : "#e94560"; // Default red
  drawRect(player, playerColor);

  // Draw enemy block (always blue)
  drawRect(enemy, "#0f3460");

  if (playerHealth <= 0 || enemyHealth <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    const message = playerHealth <= 0 ? "You Died!" : "You Defeated the Enemy!";
    ctx.fillText(message, 150, 150);
  } else {
    requestAnimationFrame(gameLoop);
  }
}

function attackEnemy() {
  const distanceX = Math.abs(player.x - enemy.x);
  const distanceY = Math.abs(player.y - enemy.y);
  const maxAttackRange = 40;

  if (distanceX < maxAttackRange && distanceY < maxAttackRange) {
    enemyHealth -= 10;
    playerHealth -= 5; // Counterattack
  } else {
    alert("You're too far away to attack!");
  }
  updateHealthDisplay();
}

function updateHealthDisplay() {
  document.getElementById("health-info").textContent =
    `Player HP: ${playerHealth} | Enemy HP: ${enemyHealth}`;
}

/* =================================================
   ==========    UTILITY FUNCTIONS    ==========
   ================================================= */

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
}

document.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    e.preventDefault();
    keys[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    e.preventDefault();
    keys[e.key] = false;
  }
});

function showInstructions() {
  alert("Use arrow keys to move your character. Click 'Attack Enemy' when close to the enemy.");
}

function showCredits() {
  alert("Created by You!");
}

function init() {
  hideAllScreens();
  document.getElementById("home-screen").classList.add("active");
}

init();
