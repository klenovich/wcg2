import { cities } from './data.js';
import { getDistanceAndDirection } from './geo.js';

let BULLSEYE = Math.floor(Math.random() * cities.length);
const GUESS_INPUT = document.querySelector("input[id='hy']");
var currentHatPrices = []
let maxGuesses = 5;
let hats = [];
        let inventory = [];
        const coinRange = { min: 50, max: 45000 };

window.onload = () => {
  document.querySelector("#city")
    .setAttribute("src", `static/geo/${cities[BULLSEYE].code}.svg`);
  
  //geoFindMe();
  updateCoinDisplay(coins);
  updateChumpDisplay(chumpChange);
  hatStoc();
  
}

// Coins ---------
//       -------

    // Cookies -------

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

    //Coins -------

let coins = getCookie("coins");
if (!coins) {
  coins = 100000;
  setCookie("coins", coins);
} else {
  coins = parseInt(coins);
}

const coinCostPerGuess = 100;

    // Chump Change!

let chumpChange = getCookie("chumpChange");
if (!chumpChange) {
  chumpChange = 1997;
  setCookie("chumpChange", chumpChange);
} else {
  chumpChange = parseInt(chumpChange);
}

const chumpPerGuess = 1;

    // Displays

const updateCoinDisplay = (coins) => {
  document.querySelector("#coin-display").textContent = `Coins: ${coins.toFixed(2)}`; 
}

const updateChumpDisplay = (chumpChange) => {
  document.querySelector("#chump-display").textContent = `Chump Change: ${chumpChange.toFixed(0)}`; 
}


//  ------------------
//    Original Game
//  ------------------

horsey(GUESS_INPUT, { source: [{ list: cities.map(c => c.name) }], limit: maxGuesses });

const processGuess = (e) => {
  const city = e.target.value;
  const numGue = 0;
  const disArray = [];
  if (e.key != "Enter" || city === '' || coins < coinCostPerGuess || chumpChange < chumpPerGuess)
    return;

  coins -= coinCostPerGuess;
  chumpChange -= chumpPerGuess;
  setCookie("coins", coins);
  updateCoinDisplay(coins);
  setCookie("chumpChange", chumpChange);
  updateChumpDisplay(chumpChange);

  const guess = cities.filter(c => city === c.name)[0];
  const target = cities[BULLSEYE];
  //

  if (guess === undefined)
    return;

  if (guess === target) {
    addTry(city, "false");
    //sharebuddy(++numGue, disArray);
    finishGuessBox("Dope ass job! Ya got it right buddy!");
    
    return;
  }

  if (guess !== target) {
    const [distance, direction] = getDistanceAndDirection(guess, target);
    const msg = `${city} (${direction} ${distance.toFixed(2)} micro meters)`;
    
    addTry(msg, "true");
    
    --maxGuesses;
    //numGue += 1;
    
    //blox = ((500 - distance.toFixed(0))/10);
    //disArray.push(blox);

    GUESS_INPUT.setAttribute("placeholder",
        `You got ${maxGuesses} guesse(s), buddy.`);
    GUESS_INPUT.value = "";
    
  }

  if (maxGuesses == 0) {
    //sharebuddy(numGue, disArray);
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
  
}

const sharebuddy = (numGue, disArray) => {
    const shareButton = document.getElementById('shareBox')
    shareButton.style.display = 'block';
    shareButton.textContent = 'Share your result';
    shareButton.addEventListener('click', () => {
      const emojiBlocks = '🧱'.repeat(numGue);
      navigator.share({
        title: 'Beast!',
        text: `I'M ADDICTED to this DOPE ASS GAME and took ${numGue} guesses (${emojiBlocks}) in the hopes to win it all! Huzzah!`,
        url: window.location.href,
      });
    });

    document.querySelector("#tries").appendChild(shareButton);

};

GUESS_INPUT.addEventListener("keyup", processGuess);

// ----
//    Stock MArket

const hatStoc = () => {
  anychart.onDocumentReady(function () {

    var dataSet = anychart.data.set( );
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });
    var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });
    var thirdSeriesData = dataSet.mapAs({ x: 0, value: 3 });
    var fourthSeriesData = dataSet.mapAs({ x: 0, value: 4 });
    var chart = anychart.line();
    chart.yAxis().title('COINS');
    var firstSeries = chart.line(firstSeriesData);
    firstSeries.name('Hat 1');
    var secondSeries = chart.line(secondSeriesData);
    secondSeries.name('Hat 2');
    var thirdSeries = chart.line(thirdSeriesData);
    thirdSeries.name('Hat 3');
    var fourthSeries = chart.line(fourthSeriesData);
    fourthSeries.name('Hat 4');
    chart.legend().enabled(true);
    chart.container('container');
    chart.draw();

    function startPrice() {
      const iprices = [];

        for (let i = 1; i < 5; i++) {
          const initialPrice = Math.floor(Math.random() * (10000 - 2000)) + 2000;
          iprices.push(initialPrice); 
          console.log(initialPrice);
          
        }

      return iprices;
    }

    const iprices = startPrice();
    const currentTime = new Date().toLocaleTimeString();
    const tuple = [currentTime, ...iprices.map(initalPrice => initalPrice)];
    dataSet.append(tuple);

    const hat1p = document.querySelector("#hat1p");
    const hat2p = document.querySelector("#hat2p");
    const hat3p = document.querySelector("#hat3p");
    const hat4p = document.querySelector("#hat4p");
    const hat1px = document.querySelector("#hat1px");
    const hat2px = document.querySelector("#hat2px");
    const hat3px = document.querySelector("#hat3px");
    const hat4px = document.querySelector("#hat4px");
    

    //console.log(tuple)

    function generateTuple() {
      setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        const tprice = [];
        
        for (let i = 2; i < 6; i++) {
          const percentageChange = Math.random() * (0.05 - (-0.05)) + (-0.05);
          const newPrice = tuple[i - 1] * (1 + percentageChange);
          tprice.push(newPrice); 
          //console.log(newPrice);
        }
        
        var curT = [currentTime, ...tprice.map(newPrice => newPrice)];
        currentHatPrices = curT;
        dataSet.append(curT);
        
        console.log(curT);
        hat1p.innerHTML = tprice[0].toFixed(2); 
        hat2p.innerHTML = tprice[1].toFixed(2);
        hat3p.innerHTML = tprice[2].toFixed(2);
        hat4p.innerHTML = tprice[3].toFixed(2);
        hat1px.innerHTML = tprice[0].toFixed(2); 
        hat2px.innerHTML = tprice[1].toFixed(2);
        hat3px.innerHTML = tprice[2].toFixed(2);
        hat4px.innerHTML = tprice[3].toFixed(2);
        
        
        
        //priceHistory.push(tuple);
    
        
        
        //tuple.push(curT);
        //console.log(tuple);
        //dataSet.append(tuple);
      }, 1000);
    }
  
    generateTuple(); 
    
  });

  console.log(currentHatPrices);
  
  
}



const openHatStoreButton = document.getElementById('hbut');
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


const buyHat = (hatId) => {
  const hatPrice = currentHatPrices[hatId];
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

const sellHat = (hatId) => {
  if(hatsInventory[hatId]) {
    hatsInventory[hatId]++;
  
    let hatPrice = currentHatPrices[hatId];
    coins += hatPrice;
    setCookie("coins", coins);
    updateCoinDisplay(coins);

    alert(`You sold a hat: ${hatId} for ${hatPrice}`);
    hatsInventory[hatId] = 0;
    setCookie("hatsInventory", JSON.stringify(hatsInventory));
    displayInventory();
    
    
    
  } else {
    alert('You aint own');
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
    
    buyHat(hatId);
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
    // eslint-disable-next-line no-loop-func
    sellButton.onclick = (function(hat) { // Use a closure to create a new scope for 'hat'
      return function() {
        inventory[hat.id].quantity -= 1;
        coins += hat.price;
        setCookie("coins", coins);
        updateCoinDisplay(coins);
        if (!inventory[hat.id].quantity) {
          inventory.splice(hat.id, 1);
        }
        updateInventory();
      };
    })(hat); // Pass 'hat' as an argument to the closure

    listItem.appendChild(sellButton);
    inventoryList.appendChild(listItem);
  }
}

const openHatStockMarket = () => {
  // Add your code for opening the hat stock market here
};
const hatStockMarketButton = document.createElement('button');
hatStockMarketButton.textContent = 'Open Hat Stock Market';
hatStockMarketButton.onclick = openHatStockMarket;
document.body.appendChild(hatStockMarketButton);

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

const updatePrices = (prices) => {
  // Implement the logic to update the prices here
  // For example, you can multiply each price by a random factor
  const updatedPrices = prices.map(price => price * Math.random());
  return updatedPrices;
};

// Place the updatePrices function before the code block where it is used

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

    if (hatsInventory[hatId]) {
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

  // Update event listeners for select and sell buttons
  updateSelectAndSellButtons();
};

// Function to update event listeners for select and sell buttons
const updateSelectAndSellButtons = () => {
  const selectButtons = document.querySelectorAll(".select-hat");
  const sellButtons = document.querySelectorAll(".sell-hat");

  selectButtons.forEach(button => {
    button.addEventListener("click", () => {
      const hatId = button.dataset.hatId;
      const hatImagePath = button.dataset.hatImage;
      selectHat(hatId, hatImagePath);
    });
  });

  sellButtons.forEach(button => {
    button.addEventListener("click", () => {
      const hatId = button.dataset.hatId;
      sellHat(hatId);
    });
  });
};

// Function to select a hat
const selectHat = (hatId, hatImagePath) => {
  const activeHatElement = document.querySelector("#active-hat");
  activeHatElement.innerHTML = `<img src="${hatImagePath}" alt="Hat ${hatId}" class="hat-image">`;
};

// Function to share a hat with friends
const shareHatWithFriends = (hatId, hatName) => {
  alert(`Sharing ${hatName} with friends!`);
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
displayInventory();

// Add event listeners for buying hats
const buy