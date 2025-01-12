// Character Data
const characters = [
  {
    name: "Loki",
    stats: { Strength: 7, Speed: 7, Intelligence: 10, Durability: 6, Magic: 10 },
  },
  {
    name: "Flash",
    stats: { Strength: 6, Speed: 10, Intelligence: 8, Durability: 5, Agility: 10 },
  },
  {
    name: "Scarlet Witch",
    stats: { Strength: 5, Speed: 6, Intelligence: 8, Durability: 5, Magic: 10 },
  },
  {
    name: "Silver Surfer",
    stats: { Strength: 10, Speed: 9, Intelligence: 9, Durability: 10, CosmicPower: 10 },
  },
  {
    name: "Star-Lord",
    stats: { Strength: 6, Speed: 6, Intelligence: 7, Durability: 6, Strategy: 8 },
  },
];

// Story Data
const story = {
  currentCharacter: null,
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
        { text: "Seek allies.", nextScene: 3 },
        { text: "Go alone.", nextScene: 4 },
      ],
    },
    {
      text: "The multiverse crumbles. Chaos reigns supreme.",
      choices: [],
    },
    {
      text: "You recruit powerful allies. Hope is restored!",
      choices: [],
    },
    {
      text: "You venture alone. The challenge is immense but not impossible.",
      choices: [],
    },
  ],
};

let currentSceneIndex = 0;

// Function to navigate to the home screen
function goToHomeScreen() {
  hideAllScreens();
  document.getElementById("home-screen").classList.add("active");
}

// Function to navigate to the character selection screen
function goToCharacterSelection() {
  hideAllScreens();
  document.getElementById("character-selection-screen").classList.add("active");
  displayCharacterCards();
}

// Function to navigate to the game screen
function startGame(characterName) {
  story.currentCharacter = characterName;
  currentSceneIndex = 0;
  hideAllScreens();
  document.getElementById("game-screen").classList.add("active");
  updateScene();
}

// Function to hide all screens
function hideAllScreens() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });
}

// Function to display character cards in the selection screen
function displayCharacterCards() {
  const container = document.getElementById("character-container");
  container.innerHTML = ""; // Clear previous cards

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <h2>${character.name}</h2>
      <div class="character-stats">
        ${Object.entries(character.stats)
          .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
          .join("")}
      </div>
    `;
    card.onclick = () => startGame(character.name);
    container.appendChild(card);
  });
}

// Function to update the current scene
function updateScene() {
  const scene = story.scenes[currentSceneIndex];
  document.getElementById("character-name").textContent = `Character: ${story.currentCharacter}`;
  document.getElementById("story-text").textContent = scene.text;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  scene.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => chooseOption(index);
    choicesContainer.appendChild(button);
  });
}

// Function to handle a choice
function chooseOption(choiceIndex) {
  const choice = story.scenes[currentSceneIndex].choices[choiceIndex];
  if (choice) {
    currentSceneIndex = choice.nextScene;
    updateScene();
  }
}

// Initialize the game on the home screen
goToHomeScreen();
