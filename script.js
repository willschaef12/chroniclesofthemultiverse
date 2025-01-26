/* =================================================
   ==========  CHARACTER & STORY DATA  ==========
   ================================================= */

   const characters = [
    {
      name: "Loki",
      variants: ["Default", "Thor's Outfit", "Villainous", "Regal"],
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
      variants: ["Default", "Speedster", "Black Suit", "Classic"],
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
      variants: ["Default", "WandaVision", "Chaos Magic", "Darkhold"],
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
      variants: ["Default", "Cosmic Energy", "Infinity Gauntlet", "Phoenix Force"],
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
      variants: ["Default", "Guardians Suit", "Space Pirate", "Rebel"],
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
  
  // State
  let selectedCharacter = null;
  let selectedVariant = null;
  
  /* =================================================
     ==========   SCREEN TRANSITIONS   ==========
     ================================================= */
  
  function goToHome() {
    hideAllScreens();
    document.getElementById("home-screen").classList.add("active");
  }
  
  function goToCharacterSelection() {
    hideAllScreens();
    document.getElementById("character-selection-screen").classList.add("active");
  
    const container = document.getElementById("character-container");
    container.innerHTML = ""; // Clear previous data
  
    characters.forEach((ch) => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `<h2>${ch.name}</h2>`;
      card.onclick = () => goToCharacterVariantSelection(ch);
      container.appendChild(card);
    });
  }
  
  function goToCharacterVariantSelection(character) {
    selectedCharacter = character;
    hideAllScreens();
    document.getElementById("character-variant-screen").classList.add("active");
  
    const container = document.getElementById("variant-container");
    container.innerHTML = ""; // Clear previous variants
  
    character.variants.forEach((variant) => {
      const variantCard = document.createElement("div");
      variantCard.className = "variant-card";
      variantCard.innerHTML = `<h3>${variant}</h3>`;
      variantCard.onclick = () => selectVariant(variant);
      container.appendChild(variantCard);
    });
  }
  
  function selectVariant(variant) {
    selectedVariant = variant;
    alert(`You selected ${selectedCharacter.name} with the ${selectedVariant} variant.`);
    // Proceed to loading screen or gameplay
    hideAllScreens();
    document.getElementById("loading-screen").classList.add("active");
    setTimeout(() => {
      document.getElementById("loading-screen").classList.remove("active");
      // Optionally, start the game here
      alert("Game Loaded!");
    }, 2000);
  }
  
  /* =================================================
     ==========    UTILITY / MISC    ==========
     ================================================= */
  
  function hideAllScreens() {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });
  }
  
  function showInstructions() {
    alert("Use arrow keys to move around the fight screen. Click 'Attack Enemy' when close enough.");
  }
  
  function showCredits() {
    alert("Created by You!");
  }
  
  // Initialize the game to show the home screen
  function init() {
    hideAllScreens();
    document.getElementById("home-screen").classList.add("active");
  }
  
  // Start the script
  init();
  