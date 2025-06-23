
const charactersList = [];
const addNewBtn = document.getElementById("add-new");
const modal = document.getElementById("character-modal");
const closeBtn = document.querySelector(".close");

// Modal open/close functionality
addNewBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
document.getElementById("modal-submit").addEventListener("click", addCharacter);

addNewBtn = document.getElementById("add-new");

//creates the character element
function createCharacterElement(name, hp, initiative) {
  const character = document.createElement('div');
  character.className = 'character-template';
  character.innerHTML = `
    <h1>Name: <span>${name}</span></h1>
    <h1>Total HP: <span>${hp}</span></h1>
    <h1>Current HP: <span>${hp}</span></h1>
    <h1>Initiative: <span>${initiative}</span></h1>
  `;
  return character;
}

function addCharacter() {
  const name = document.getElementById('modal-name').value;
  const totalHp = document.getElementById('modal-hp').value;
  const initiative = Math.floor(Math.random() * 20 + 1);

  if (name && totalHp &&initiative) {
    //create character object
    const character = {
      id: Date.now(), //unique id using timestamp
      name: name,
      totalHp: parseInt(totalHp),
      currentHp: parseInt(totalHp),
      initiative: parseInt(initiative),
      statusEffects: []
    };


    //add to array
    charactersList.push(character);

    //sort by initiative
    charactersList.sort((a, b) => b.initiative - a.initiative);

    //call renderCharacterList function
    renderCharacterList();

    modal.style.display = "none";
  }
}

function renderCharacterList() {
  const listContainer = document.getElementById('character-list');
  listContainer.innerHTML = '';

  charactersList.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.className = 'character-template';
    characterElement.dataset.id = character.id;
    characterElement.innerHTML = `
  <div class="character-header">${character.name}</div>
  <div class="character-content">
    <div class="character-stats">
      <h1>Total HP: <span>${character.totalHp}</span></h1>
      <h1>Current HP: <span class="current-hp">${character.currentHp}</span></h1>
      <h1>Initiative: <span>${character.initiative}</span></h1>
      <h1>Status: <span>Healthy</span></h1>
    </div>
    <div class="character-actions">
      <button class="damage-btn">-5 HP</button>
      <button class="heal-btn">+5 HP</button>
      <button class="remove-btn">Remove</button>
    </div>
  </div>
`;
    listContainer.appendChild(characterElement);
  });
  listContainer.appendChild(addNewBtn);
  addCharacterEventListeners();
}

//handles character actions
function addCharacterEventListeners() {
  document.querySelectorAll('.damage-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const characterId = parseInt(this.closest('.character-template').dataset.id);
      const character = charactersList.find(c => c.id === characterId);
      character.currentHp -= 5;
      renderCharacterList();
    });
  });

  document.querySelectorAll('.heal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const characterId = parseInt(this.closest('.character-template').dataset.id);
      const character = charactersList.find(c => c.id === characterId);
      character.currentHp += 5;
      renderCharacterList();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const characterId = parseInt(this.closest('.character-template').dataset.id);
      const character = charactersList.find(c => c.id === characterId);
      if(character)
      renderCharacterList();
    });
  });
  //add other event listeners here
}



