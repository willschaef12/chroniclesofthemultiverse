// Character Data
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
  ];
  
  // Story Data
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
  
  // Function to display the character selection screen
  function goToCharacterSelection() {
    document.getElementById("home-screen").classList.remove("active");
    document.getElementById("character-selection-screen").classList.add("active");
  
    const container = document.getElementById("character-container");
    container.innerHTML = ""; // Clear previous characters
  
    characters.forEach((character) => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <h2>${character.name}</h2>
        <div id="character-stats">
          ${Object.entries(character.stats)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join("")}
        </div>
      `;
      card.onclick = () => selectCharacter(character.name);
      container.appendChild(card);
    });
  }
  
  // Function to select a character and start the game
  function selectCharacter(characterName) {
    story.currentCharacter = characterName;
    document.getElementById("character-selection-screen").classList.remove("active");
    document.getElementById("game-container").classList.add("active");
    updateScene();
  }
  
  // Function to update the current scene
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
  
  // Function to handle a choice
  function chooseOption(choiceIndex) {
    const choice = story.scenes[currentSceneIndex].choices[choiceIndex];
    if (choice) {
      currentSceneIndex = choice.nextScene;
      updateScene();
    }
  }
  
  // Initialize the game on the home screen
  document.getElementById("home-screen").classList.add("active");
  