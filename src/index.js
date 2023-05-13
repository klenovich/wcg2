import { cities } from './data.js';
import { getDistanceAndDirection } from './geo.js';

let BULLSEYE = Math.floor(Math.random() * cities.length);
const GUESS_INPUT = document.querySelector("input[id='hy']");

window.onload = () => {
  document.querySelector("#city")
    .setAttribute("src", `static/geo/${cities[BULLSEYE].code}.svg`);
  updateCoinDisplay(coins);
}

horsey(GUESS_INPUT, { source: [{ list: cities.map(c => c.name) }], limit: 5 });

let maxGuesses = 6;

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

  if (e.which === 13) {
    let isValidGuess = true;
    maxGuesses--;

    if (maxGuesses == 0) {
      finishGuessBox(`The wright country is: ${target.name}.`);
    }
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
  sharebuddy(initialGuesses - maxGuesses);
}

const sharebuddy = (guessesTaken) => {
  if (navigator.share) {
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
  } else {
    console.warn("Web Share API is not supported in your browser.");
  }
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

// ... your existing code including the updated coin system

// Step 1: Add a button to open the hat store UI
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

// Update the buyHat function to handle buying hats from either the inventory or the stock market
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

// Load the saved inventory, if it exists
const inventoryCookie = getCookie("hatsInventory");
if(inventoryCookie) {
  hatsInventory = JSON.parse(inventoryCookie);
}

const displayInventory = () => {
  const inventoryElement = document.querySelector("#hat-inventory");
  inventoryElement.innerHTML = ''; // Clear the current inventory display

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

// Step 3: Add a function to sell a hat for 50% of the original price
const sellHat = (hatId, hatPrice) => {
  if (hatsInventory[hatId] && hatsInventory[hatId] > 0) {
    hatsInventory[hatId]--;
    setCookie("hatsInventory", JSON.stringify(hatsInventory));

    const sellPrice = Math.floor(hatPrice / 2);
    coins += sellPrice;
    setCookie("coins", coins);
    updateCoinDisplay(coins);

    alert(`You sold a hat: ${hatId}`);
    displayInventory();
  } else {
    alert('You do not have this hat in your inventory!');
  }
};

const updateSelectAndSellButtons = () => {
  const selectHatButtons = document.querySelectorAll(".select-hat");
  for (const button of selectHatButtons) {
    button.addEventListener('click', () => {
      const hatId = button.dataset.hatId;
      const hatImagePath = button.dataset.hatImage;
      selectHat(hatId, hatImagePath);
    });
  }

  const sellHatButtons = document.querySelectorAll(".sell-hat");
  for (const button of sellHatButtons) {
    button.addEventListener('click', () => {
      const hatId = button.dataset.hatId;
      const hatPrice = parseInt(button.dataset.hatPrice, 10);
      sellHat(hatId, hatPrice);
    });
  }
};

// Initialize event listeners for select and sell buttons
updateSelectAndSellButtons();

// ... your existing code including the hat store and inventory integration

const stockTickerElement = document.querySelector("#stock-ticker");

// Generate initial stock prices and populate stock ticker
const hatStocks = {};
for (let i = 1; i <= 10; i++) {
  const initialPrice = getRandomInt(500, 15000);
  const times = new Array(20).fill(0).map((_, idx) => idx * -5); // Last 10 minutes in 5-second intervals
  hatStocks[`hat${i}`] = times.map(() => {
    const priceChange = getRandomPercentageChange();
    initialPrice *= (1 + priceChange);
    return { price: Math.floor(initialPrice), timestamp: Date.now() - 5 * 60 * 1000 };
  });
  addHatStock(`hat${i}`, initialPrice);
}

// Update stock prices every 5 seconds
setInterval(() => {
  for (const hatId in hatStocks) {
    const price = hatStocks[hatId][hatStocks[hatId].length - 1].price;
    const newPrice = Math.floor(price * (1 + getRandomPercentageChange()));
    hatStocks[hatId].push({ price: newPrice, timestamp: Date.now() });

    document.querySelector(`#stock-${hatId} span`).textContent = `💲${newPrice.toLocaleString()}`;
  }
}, 5000);

function addHatStock(hatId, price) {
  const stockItem = document.createElement("li");
  stockItem.id = `stock-${hatId}`;
  stockItem.innerHTML = `
    ${hatId} <span>💲${price.toLocaleString()}</span>
    <button class="buy-hat-stock" data-hat-id="${hatId}" data-price="${price}">Buy</button>
  `;
  stockTickerElement.appendChild(stockItem);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPercentageChange() {
  return (Math.random() * 0.04) - 0.02; // Random percentage change between -2% and 2%
}

hatElement.innerHTML = `
  // ... your existing hatElement innerHTML code
  <button class="tell-friends" data-hat-id="${hatId}" data-hat-name="${hatName}" data-hat-image="${hatImagePath}">📣 Tell my friends about this hat</button>
`;

// Inside the updateSelectAndSellButtons function
const tellFriendsButtons = document.querySelectorAll(".tell-friends");
for (const button of tellFriendsButtons) {
  button.addEventListener("click", () => {
    const hatId = button.dataset.hatId;
    const hatName = button.dataset.hatName;
    const hatImagePath = button.dataset.hatImage;

    if (navigator.share) {
      navigator.share({
        title: `Check out this cool ${hatName} I got on the hat game!`,
        text: `I just bought a ${hatName} on the hat game! 🎩🤠`,
        url: location.href
      }).then(() => {
        console.log("Successfully shared");
      }).catch(error => {
        console.error("Error sharing:", error);
      });
    } else {
      alert("Sharing is not supported on this browser.");
    }
  });
}

// ... your existing code including the hat store, inventory integration, and other features.

// Helper functions for generating random hat prices and updating them
const generateRandomPrice = () => {
  return Math.floor(Math.random() * 14501) + 500;
};

const generateRandomPercentage = () => {
  return Math.floor(Math.random() * 11) - 5;
};

const updateHatPrices = (prices) => {
  return prices.map((price) => {
    const percentageChange = 1 + generateRandomPercentage() / 100;
    const newPrice = Math.round(price * percentageChange);
    return Math.min(Math.max(500, newPrice), 15000);
  });
};

// Initialize stock market display
const hatStockMarket = document.querySelector("#hat-stock-market");
const openHatStockMarket = document.querySelector("#open-hat-stock-market");
const closeHatStockMarket = document.querySelector("#close-hat-stock-market");
const stockTicker = document.querySelector("#stock-ticker");

const initialPrices = Array.from({ length: 10 }, generateRandomPrice);
for (let i = 0; i < 10; i++) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    Hat ${i + 1} <span id="hat${i + 1}-price">💲${initialPrices[i].toLocaleString()}</span>
    <button class="buy-hat" data-hat-id="hat${i + 1}" data-price="${initialPrices[i]}">Buy</button>
  `;
  stockTicker.appendChild(listItem);
}

// Update the stock ticker prices every 5 seconds
let stockPrices = initialPrices;
setInterval(() => {
  stockPrices = updateHatPrices(stockPrices);
  for (let i = 1; i <= 10; i++) {
    document.querySelector(`#hat${i}-price`).textContent = `💲${stockPrices[i - 1].toLocaleString()}`;
  }
}, 5000);

// Add event listeners for opening and closing the hat stock market
openHatStockMarket.addEventListener("click", () => {
  hatStockMarket.style.display = "block";
});

closeHatStockMarket.addEventListener("click", () => {
  hatStockMarket.style.display = "none";
});

// Add an event listener for buying a hat
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

// Add the "Tell my friends about this hat" option to the hat inventory
const shareHatWithFriends = (hatId, hatName) => {
  if (navigator.share) {
    navigator.share({
      title: `Check out this cool ${hatName} I got on the hat game!`,
      text: `I just bought a ${hatName} on the hat game! 🎩🤠`,
      url: location.href
    }).then(() => {
      console.log("Successfully shared");
    }).catch(error => {
      console.error("Error sharing:", error);
    });
  } else {
    alert("Sharing is not supported on this browser.");
  }
};

// Update the displayInventory() function to include the "Tell my friends about this hat" button


// Call the displayInventory() function to update the inventory display
displayInventory();

openHatStockMarket.addEventListener("click", () => {
  hatStockMarket.style.display = "block";
});

closeHatStockMarket.addEventListener("click", () => {
  hatStockMarket.style.display = "none";
});

// Add an event listener for buying a hat
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

// Hat animation function
const animateHat = (hatImage) => {
  const animationDuration = 500; // 500 milliseconds

  const keyframes = [
    { transform: 'scale(1)', offset: 0 },
    { transform: 'scale(1.3)', offset: 0.5 },
    { transform: 'scale(1)', offset: 1 }
  ];

  const animationOptions = {
    duration: animationDuration,
    iterations: Infinity
  };

  hatImage.animate(keyframes, animationOptions);
};