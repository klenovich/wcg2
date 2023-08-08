// Define variables and select DOM elements
let coins = 100;
const coinDisplay = document.getElementById('coinDisplay');
const hatStoreButton = document.getElementById('openHatStoreButton');
const hatInventory = {};

// Function to update the coin display
const updateCoinDisplay = (coins) => {
  coinDisplay.textContent = coins;
};

// Function to buy a hat
const buyHat = (hatId) => {
  const hatPrice = currentHatPrices[hatId];
  if (coins >= hatPrice) {
    coins -= hatPrice;
    setCookie("coins", coins);
    updateCoinDisplay(coins);

    hatsInventory[hatId] = (hatsInventory[hatId] || 0) + 1;
    setCookie("hatsInventory", JSON.stringify(hatsInventory));
    displayInventory();

    alert(`You bought a hat: ${hatId}`);
  } else {
    alert('Not enough coins!');
  }
};

// Function to sell a hat
const sellHat = (hatId) => {
  if (hatsInventory[hatId]) {
    hatsInventory[hatId]--;

    let hatPrice = currentHatPrices[hatId];
    coins += hatPrice;
    setCookie("coins", coins);
    updateCoinDisplay(coins);

    alert(`You sold a hat: ${hatId} for ${hatPrice}`);
    if (hatsInventory[hatId] === 0) {
      delete hatsInventory[hatId];
    }
    setCookie("hatsInventory", JSON.stringify(hatsInventory));
    displayInventory();
  } else {
    alert('You do not own this hat');
  }
};

// Function to display the hat inventory
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

// Function to update the stock ticker
const updateStockTicker = () => {
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
};

// Function to update the inventory
const updateInventory = () => {
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
};

// Function to open the hat stock market
const openHatStockMarket = () => {
  // Add your code for opening the hat stock market here
};

// Event listener for opening the hat store
hatStoreButton.addEventListener('click', () => {
  document.querySelector('#hat-store').classList.add('open');
});

// Event listener for closing the hat store
document.querySelector('.close-hat-store').addEventListener('click', () => {
  document.querySelector('#hat-store').classList.remove('open');
});

// Load and display the user's inventory when the page loads
window.addEventListener('DOMContentLoaded', () => {
  createHats(coinRange);
  const hatStockMarketButton = document.createElement('button');
  hatStockMarketButton.textContent = 'Open Hat Stock Market';
  hatStockMarketButton.onclick = openHatStockMarket;
  document.body.appendChild(hatStockMarketButton);

  hatsInventory = JSON.parse(getCookie("hatsInventory"));
  coins = parseInt(getCookie("coins"), 10);
  updateCoinDisplay(coins);
  displayInventory();
});

// Update event listeners for select and sell buttons
updateSelectAndSellButtons();

// Function to share a hat with friends
const shareHatWithFriends = (hatId, hatName) => {
  alert(`Sharing ${hatName} with friends!`);
};

// Function to set cookies
const setCookie = (name, value) => {
  // Implement the logic to set cookies here
};

// Function to get cookies
const getCookie = (name) => {
  // Implement the logic to get cookies here
};

// Export functions and variables if needed
export {
  buyHat,
  sellHat,
  updateCoinDisplay,
  displayInventory,
  selectHat,
  shareHatWithFriends,
  openHatStockMarket
};

// Function to select a hat
const selectHat = (hatId) => {
  const selectedHat = document.querySelector(`.hat[data-id="${hatId}"]`);
  // Add your logic to handle hat selection here
};

// Function to update event listeners for select and sell buttons
const updateSelectAndSellButtons = () => {
  const selectButtons = document.querySelectorAll('.select-hat');
  const sellButtons = document.querySelectorAll('.sell-hat');

  selectButtons.forEach(button => {
    const hatId = button.dataset.hatId;
    const hatImage = button.dataset.hatImage;
    button.addEventListener('click', () => {
      selectHat(hatId);
    });
  });

  sellButtons.forEach(button => {
    const hatId = button.dataset.hatId;
    const hatPrice = button.dataset.hatPrice;
    button.addEventListener('click', () => {
      sellHat(hatId);
    });
  });
};

// Function to create hats with random prices
const createHats = (range) => {
  for (let i = 0; i < range; i++) {
    const hat = {
      id: i,
      price: Math.floor(Math.random() * 100) + 1
    };
    hats.push(hat);
  }
};

// Load and display the user's inventory when the page loads
window.addEventListener('DOMContentLoaded', () => {
  hatsInventory = JSON.parse(getCookie("hatsInventory"));
  coins = parseInt(getCookie("coins"), 10);
  updateCoinDisplay(coins);
  displayInventory();
});

// Export functions and variables if needed
export {
  buyHat,
  sellHat,
  updateCoinDisplay,
  displayInventory,
  selectHat,
  shareHatWithFriends,
  openHatStockMarket
};