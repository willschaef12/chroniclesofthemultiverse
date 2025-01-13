/* =================================================
   ==========  CHARACTER & STORY DATA  ==========
   ================================================= */

// Available characters
const characters = [
  {
    name: "Loki",
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

// Optional basic story structure
const story = {
  currentCharacter: "Loki",
  scenes: [
    {
      text: "The multiverse is collapsing. Will you act to save it?",
      choices: [
        { text: "Yes, save it.", nextScene: 1 },
        { text: "No, let it fall.", nextScene: 2 },
      ],
    },
    {
      text: "You decide to act and seek allies across the multiverse.",
      choices: [
        { text: "Switch to Flash", nextScene: 3 },
        { text: "Continue as Loki", nextScene: 4 },
      ],
    },
    {
      text: "The multiverse crumbles. Chaos reigns supreme.",
      choices: [],
    },
  ],
};

let currentSceneIndex = 0;

/* =================================================
   ==========   FIGHT VARIABLES   ==========
   ================================================= */

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

// Show the character selection screen
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

// Select a character, show the loading screen, then fight
function selectCharacter(characterName) {
  selectedCharacter = characters.find((c) => c.name === characterName);
  story.currentCharacter = characterName;

  hideAllScreens();
  document.getElementById("loading-screen").classList.add("active");

  // Simulate loading delay, then go to fight
  setTimeout(() => {
    document.getElementById("loading-screen").classList.remove("active");
    startFightScreen();
  }, 2000);
}

// Initialize the fight screen (canvas, HP, etc.)
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

// Return to the home screen
function goToHome() {
  hideAllScreens();
  document.getElementById("home-screen").classList.add("active");
}

/* =================================================
   ==========   STORY / GAME SCREEN   ==========
   ================================================= */

function goToStory() {
  hideAllScreens();
  document.getElementById("game-container").classList.add("active");
  updateScene();
}

function updateScene() {
  const scene = story.scenes[currentSceneIndex];
  document.getElementById("character").textContent = `Character: ${story.currentCharacter}`;
  document.getElementById("story-text").textContent = scene.text;

  const choicesElement = document.getElementById("choices");
  choicesElement.innerHTML = "";

  scene.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => chooseOption(index);
    choicesElement.appendChild(button);
  });
}

function chooseOption(choiceIndex) {
  const choice = story.scenes[currentSceneIndex].choices[choiceIndex];
  if (choice) {
    currentSceneIndex = choice.nextScene;
    updateScene();
  }
}

/* =================================================
   ==========   FIGHTING LOGIC   ==========
   ================================================= */

// Render rectangular "sprites"
function drawRect(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Update player position based on key input
function updatePositions() {
  if (keys.ArrowUp) player.y -= player.speed;
  if (keys.ArrowDown) player.y += player.speed;
  if (keys.ArrowLeft) player.x -= player.speed;
  if (keys.ArrowRight) player.x += player.speed;

  // Keep player within canvas bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Main game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw
  updatePositions();
  drawRect(player, "#e94560"); // Player in red
  drawRect(enemy, "#0f3460");  // Enemy in blue

  // Check win/loss conditions
  if (playerHealth <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("You Died!", 150, 150);
  } else if (enemyHealth <= 0) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("You Defeated the Enemy!", 80, 150);
  } else {
    // Keep animating
    requestAnimationFrame(gameLoop);
  }
}

// Updates the health info on screen
function updateHealthDisplay() {
  document.getElementById("health-info").textContent =
    `Player HP: ${playerHealth} | Enemy HP: ${enemyHealth}`;
}

// Attack function
function attackEnemy() {
  // Check distance to enemy
  const distanceX = Math.abs(player.x - enemy.x);
  const distanceY = Math.abs(player.y - enemy.y);
  const maxAttackRange = 40;

  if (distanceX < maxAttackRange && distanceY < maxAttackRange) {
    // Enemy takes damage
    enemyHealth -= 10;

    // Simple counterattack
    playerHealth -= 5;
  } else {
    alert("You're too far away to attack!");
  }

  updateHealthDisplay();
}

/* =================================================
   ==========    UTILITY / MISC    ==========
   ================================================= */

function showInstructions() {
  alert("Use arrow keys to move around the fight screen. Click 'Attack Enemy' when close enough.");
}

function showCredits() {
  alert("Created by You!");
}

// Prevent arrow keys from scrolling the page
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

// Hide all screens (utility)
function hideAllScreens() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
}

// Initialize the game to show the home screen
function init() {
  hideAllScreens();
  document.getElementById("home-screen").classList.add("active");
}

// Start the script
init();
