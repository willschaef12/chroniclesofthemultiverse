// script.js

// Define the story data
const story = {
    currentCharacter: "Loki",
    scenes: [
      {
        text: "The multiverse is collapsing. Will you act to save it?",
        choices: [
          { text: "Yes, save it.", nextScene: 1 },
          { text: "No, let it fall.", nextScene: 2 }
        ]
      },
      {
        text: "Loki decides to act and seek out allies across the multiverse.",
        choices: [
          { text: "Switch to Flash", nextScene: 3 },
          { text: "Continue as Loki", nextScene: 4 }
        ]
      },
      {
        text: "The multiverse crumbles into chaos. Loki revels in its destruction.",
        choices: []
      },
      {
        text: "Flash joins the mission, racing to stabilize a crumbling world.",
        choices: [
          { text: "Help civilians", nextScene: 5 },
          { text: "Fight the invaders", nextScene: 6 }
        ]
      },
      {
        text: "Loki continues his journey, uncovering secrets of the collapse.",
        choices: []
      },
      {
        text: "Flash saves countless lives, gaining the trust of the people.",
        choices: []
      },
      {
        text: "Flash battles the invaders, pushing them back into the void.",
        choices: []
      }
    ]
  };
  
  // Track the current scene
  let currentSceneIndex = 0;
  
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
  
      // Switch character (example logic)
      if (choice.text.includes("Flash")) {
        story.currentCharacter = "Flash";
      }
  
      updateScene();
    }
  }
  
  // Start the game
  updateScene();
  