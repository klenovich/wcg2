import { cities } from './data.js';
import { getDistanceAndDirection } from './geo.js';

let BULLSEYE = Math.floor(Math.random() * cities.length);
const GUESS_INPUT = document.querySelector("input[id='hy']");
let hatStockTicker;
let hats = [];
        let inventory = [];
        const coinRange = { min: 50, max: 45000 };

window.onload = () => {
  document.querySelector("#city")
    .setAttribute("src", `static/geo/${cities[BULLSEYE].code}.svg`);
  updateCoinDisplay(coins);
  hatStockTicker = initHatStockTicker(10);
  openHatStockMarket();
}

horsey(GUESS_INPUT, { source: [{ list: cities.map(c => c.name) }], limit: 5 });

let maxGuesses = 5;

const processGuess = (e) => {
  const city = e.target.value;
  if (e.key != "Enter" || city === '' || coins < coinCostPerGuess)
    return;

  coins -= coinCostPerGuess;
  setCookie("coins", coins);
  updateCoinDisplay(coins);

  const guess = cities.filter(c => city === c.name)[0];
  const target = cities[BULLSEYE];

  if (guess === undefined)
    return;

  if (guess === target) {
    addTry(city, "false");
    finishGuessBox("Dope ass job! Ya got it right buddy!");
    return;
  }

  if (guess !== target) {
    const [distance, direction] = getDistanceAndDirection(guess, target);
    const msg = `${city} (${direction} ${distance.toFixed(2)} micro meters)`;

    addTry(msg, "true");
    --maxGuesses;

    GUESS_INPUT.setAttribute("placeholder",
        `You got ${maxGuesses} guesse(s), buddy.`);
    GUESS_INPUT.value = "";
  }

  if (maxGuesses == 0) {
    finishGuessBox(`The wright country is: ${target.name}.`);
  }

}

const addTry = (msg, isInvalid) => {
  const item = document.createElement("input");
  item.setAttribute("type", "text");
  item.setAttribute("placeholder", msg);
  item.setAttribute("disabled", "true");
  item.setAttribute("aria-invalid", isInvalid);
  document.querySelector("#tries").appendChild(item);
}

const finishGuessBox = (msg) => {
  GUESS_INPUT.setAttribute("placeholder", msg);
  GUESS_INPUT.setAttribute("disabled", "true");
  GUESS_INPUT.value = "";
  sharebuddy(initialGuesses);
}

const sharebuddy = (guessesTaken) => {
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share your result';
    shareButton.addEventListener('click', () => {
      const emojiBlocks = '🧱'.repeat(guessesTaken);
      navigator.share({
        title: 'Beast!',
        text: `I'M ADDICTED to this DOPE ASS GAME and took ${guessesTaken} guesses (${emojiBlocks}) in the hopes to win it all! Huzzah!`,
        url: window.location.href,
      });
    });

    document.querySelector("#tries").appendChild(shareButton);

};

GUESS_INPUT.addEventListener("keyup", processGuess);

// Coin system
const setCookie = (cname, cvalue) => {
  document.cookie = `${cname}=${cvalue};path=/`;
}

const getCookie = (cname) => {
  const name = `${cname}=`;
  const cookies = document.cookie.split(';');
  
  for(let cookie of cookies) {
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return "";
}

let coins = getCookie("coins");
if (!coins) {
  coins = 100000;
  setCookie("coins", coins);
} else {
  coins = parseInt(coins);
}

const coinCostPerGuess = 100;

const updateCoinDisplay = (coins) => {
  document.querySelector("#coin-display").textContent = `Coins: ${coins}`; 
}


const openHatStoreButton = document.createElement('button');
openHatStoreButton.textContent = 'Open Hat Store';
openHatStoreButton.addEventListener('click', () => {
  document.querySelector('#hat-store').classList.toggle('open');
});
document.body.appendChild(openHatStoreButton);

document.querySelectorAll(".buy-hat-stock").forEach(button => {
  button.addEventListener("click", () => {
    const hatId = button.dataset.hatId;
    const price = parseInt(button.dataset.price);
    buyHat(price, hatId);
  });
});


const buyHat = (hatPrice, hatId) => {
  if (coins >= hatPrice) {
    coins -= hatPrice;
    setCookie("coins", coins);
    updateCoinDisplay(coins);

    if(hatsInventory[hatId]) {
      hatsInventory[hatId]++;
    } else {
      hatsInventory[hatId] = 1;
    }
    setCookie("hatsInventory", JSON.stringify(hatsInventory));
    displayInventory();

    alert(`You bought a hat: ${hatId}`);
  } else {
    alert('Not enough coins!');
  }
};

document.querySelector('.close-hat-store').addEventListener('click', () => {
  document.querySelector('#hat-store').classList.remove('open');
});

const buyHatButtons = document.querySelectorAll('.buy-hat');
for (const button of buyHatButtons) {
  button.addEventListener('click', (e) => {
    const hatElement = e.target.parentElement;
    const hatId = hatElement.dataset.id;
    const hatPrice = parseInt(hatElement.dataset.price, 10);
    buyHat(hatPrice, hatId);
  });
}
let hatsInventory = {};

const inventoryCookie = getCookie("hatsInventory");
if(inventoryCookie) {
  hatsInventory = JSON.parse(inventoryCookie);
}

const displayInventory = () => {
  const inventoryElement = document.querySelector("#hat-inventory");
  inventoryElement.innerHTML = ''; 

  for (const hatId in hatsInventory) {
    const hatElement = document.createElement("div");
    hatElement.classList.add("hat-item");

    const hatCount = hatsInventory[hatId];
    const hatDataElement = document.querySelector(`.hat[data-id="${hatId}"]`);
    const hatName = hatDataElement.querySelector("h3").textContent;
    const hatImagePath = hatDataElement.querySelector("img").src;

    hatElement.innerHTML = `
      <img src="${hatImagePath}" alt="${hatName}" class="hat-image">
      <strong>Hat: </strong> ${hatName}<br>
      <strong>Quantity: </strong> ${hatCount}<br>
      <button class="select-hat" data-hat-id="${hatId}" data-hat-image="${hatImagePath}">Select</button> 
      <button class="sell-hat" data-hat-id="${hatId}" data-hat-price="${hatDataElement.dataset.price}">Sell</button>
    `;

    inventoryElement.appendChild(hatElement);
  }

  

  for (const hatId in hatsInventory) {
    const hatElement = document.createElement("div");

    // ... your existing code for creating hat elements ...

    // Tell friends button
    const tellFriendsButton = document.createElement("button");
    tellFriendsButton.textContent = `📣 Tell my friends about ${hatName}`;
    tellFriendsButton.addEventListener("click", () => {
      shareHatWithFriends(hatId, hatName);
    });
    hatElement.appendChild(tellFriendsButton);

    // Select button
    const selectButton = document.createElement("button");
    selectButton.textContent = 'Select';
    selectButton.addEventListener("click", () => {
      selectHat(hatId, hatImagePath);
    });
    hatElement.appendChild(selectButton);

    // Append the hat element to the inventory
    inventoryElement.appendChild(hatElement);
  }

  // Bounce the hat images
  const hatImages = inventoryElement.querySelectorAll(".hat-image");
  for (const hatImage of hatImages) {
    animateHat(hatImage);
  }
  // Update event listeners for select and sell buttons
  updateSelectAndSellButtons();
};

// Step 4: Load and display the user's inventory when the page loads
displayInventory();

const selectHat = (hatId, hatImagePath) => {
  const activeHatElement = document.querySelector("#active-hat");
  activeHatElement.innerHTML = `<img src="${hatImagePath}" alt="Hat ${hatId}" class="hat-image">`;
};


document.querySelectorAll(".buy-hat").forEach((button) => {
  button.addEventListener("click", () => {
    const hatId = button.dataset.hatId;
    const price = parseInt(button.dataset.price, 10);
    if (price <= coins) {
      if (hatsInventory[hatId]) {
        hatsInventory[hatId]++;
      } else {
        hatsInventory[hatId] = 1;
      }

      coins -= price;
      setCookie("coins", coins);
      updateCoinDisplay(coins);
      setCookie("hatsInventory", JSON.stringify(hatsInventory));
      displayInventory();

      alert(`You bought a ${hatId}`);
    } else {
      alert("Not enough coins!");
    }
  });
});

function updateStockTicker() {
  const stockTicker = document.getElementById('stockTicker');
  stockTicker.innerHTML = '';

  for (let hat of hats) {
      const listItem = document.createElement('li');
      const buyButton = document.createElement('button');

      buyButton.textContent = 'Buy';
      buyButton.onclick = () => {
          const hatIndex = inventory.findIndex(item => item.id === hat.id);
          if (hatIndex !== -1) {
              inventory[hatIndex].quantity += 1;
          } else {
              inventory.push({ ...hat, quantity: 1 });
          }
          coins -= hat.price;
          setCookie("coins", coins);
          updateCoinDisplay(coins);
          updateInventory();
      };
      
      listItem.textContent = `Hat ${hat.id + 1}: ${hat.price.toFixed(0)} coins `;
      listItem.appendChild(buyButton);
      stockTicker.appendChild(listItem);
  }
}

function updateInventory() {
  const inventoryList = document.getElementById('inventoryList');
  inventoryList.innerHTML = '';

  for (let hat of inventory) {
      const listItem = document.createElement('li');
      const sellButton = document.createElement('button');

      listItem.textContent = `Hat ${hat.id + 1}: ${hat.price.toFixed(0)} coins x${hat.quantity} `;

      sellButton.textContent = 'Sell';
      sellButton.onclick = () => {
          inventory[hat.id].quantity -= 1;
          coins += hat.price;
          setCookie("coins", coins);
          updateCoinDisplay(coins);
          if (!inventory[hat.id].quantity) {
              inventory.splice(hat.id, 1);
          }
          updateInventory();
      };
      listItem.appendChild(sellButton);
      inventoryList.appendChild(listItem);
  }
}

function openHatStockMarket() {
  document.getElementById('hatStockMarket').style.display = 'block';
}

function closeHatStockMarket() {
  document.getElementById('hatStockMarket').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  createHats(coinRange);
  const hatStockMarketButton = document.createElement('button');
  hatStockMarketButton.textContent = 'Open Hat Stock Market';
  hatStockMarketButton.onclick = openHatStockMarket;
  document.body.appendChild(hatStockMarketButton);

  setInterval(() => {
      hats = hats.map(hat => {
          const newPrice = updatePrices([hat.price])[0];
          return { ...hat, price: newPrice };
      });
      updateStockTicker();
  }, 5000);
  updateStockTicker();
});