// Define characters and their stats
const characters = [
    {
      name: "Loki",
      stats: {
        Intelligence: 95,
        Strength: 65,
        Speed: 70,
        Durability: 80,
        EnergyProjection: 85,
        Combat: 75
      }
    },
    {
      name: "Flash",
      stats: {
        Intelligence: 80,
        Strength: 50,
        Speed: 100,
        Durability: 70,
        EnergyProjection: 60,
        Combat: 85
      }
    },
    {
      name: "Silver Surfer",
      stats: {
        Intelligence: 90,
        Strength: 100,
        Speed: 95,
        Durability: 100,
        EnergyProjection: 100,
        Combat: 80
      }
    },
    {
      name: "Scarlet Witch",
      stats: {
        Intelligence: 85,
        Strength: 70,
        Speed: 65,
        Durability: 75,
        EnergyProjection: 100,
        Combat: 70
      }
    }
  ];
  
  // Track the current scene and character
  let currentSceneIndex = 0;
  let selectedCharacter = characters[0]; // Default to Loki
  
  // Function to transition to the character selection screen
  function goToCharacterSelection() {
    document.getElementById("home-screen").classList.remove("active");
    document.getElementById("character-selection-screen").classList.add("active");
    loadCharacterCards();
  }
  
  // Function to load character cards
  function loadCharacterCards() {
    const charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = ""; // Clear any existing cards
  
    characters.forEach((character, index) => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <h2>${character.name}</h2>
        <div id="character-stats">
          <p>Intelligence: ${character.stats.Intelligence}</p>
          <p>Strength: ${character.stats.Strength}</p>
          <p>Speed: ${character.stats.Speed}</p>
          <p>Durability: ${character.stats.Durability}</p>
          <p>Energy Projection: ${character.stats.EnergyProjection}</p>
          <p>Combat: ${character.stats.Combat}</p>
        </div>
      `;
      card.onclick = () => selectCharacter(index);
      charactersElement.appendChild(card);
    });
  }
  
  // Function to select a character
  function selectCharacter(index) {
    selectedCharacter = characters[index];
    story.currentCharacter = selectedCharacter.name;
  
    // Transition to the game screen
    document.getElementById("character-selection-screen").classList.remove("active");
    document.getElementById("game-container").classList.add("active");
  
    // Start the game
    updateScene();
  }
  
  // Function to update the scene
  function updateScene() {
    const scene = story.scenes[currentSceneIndex];
    const characterElement = document.getElementById("character");
    const storyTextElement = document.getElementById("story-text");
    const choicesElement = document.getElementById("choices");
  
    // Update the character name
    characterElement.textContent = `Character: ${story.currentCharacter}`;
  
    // Update the story text
    storyTextElement.textContent = scene.text;
  
    // Clear previous choices
    choicesElement.innerHTML = "";
  
    // Add new choices
    scene.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.onclick = () => chooseOption(index);
      choicesElement.appendChild(button);
    });
  }
  
  // Function to handle a choice
  function chooseOption(choiceIndex) {
    const scene = story.scenes[currentSceneIndex];
    const choice = scene.choices[choiceIndex];
  
    if (choice) {
      currentSceneIndex = choice.nextScene;
  
      // Update scene
      updateScene();
    }
  }
  