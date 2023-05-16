import { cities } from './data.js';
import { getDistanceAndDirection } from './geo.js';

let BULLSEYE = Math.floor(Math.random() * cities.length);
const GUESS_INPUT = document.querySelector("input[id='hy']");
let hatStockTicker;
var currentHatPrices = []
let hats = [];
        let inventory = [];
        const coinRange = { min: 50, max: 45000 };

window.onload = () => {
  document.querySelector("#city")
    .setAttribute("src", `static/geo/${cities[BULLSEYE].code}.svg`);
  
  //geoFindMe();
  updateCoinDisplay(coins);
  updateChumpDisplay(chumpChange);
  beastModeGPS();
  hatStockTicker = hatStockTicker(10);
  openHatStockMarket();
  
}

function beastModeGPS() {
fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(res => {
    console.log("Country: ", res.country);
 })
 .catch((data, status) => {
    console.log('Request failed');
 })
}

/*    Shit Sux

function geoFindMe() {
  if (!navigator.geolocation){
   console.log("Geolocation is not supported by your browser");
    return;
  }
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(longitude, latitude)
    reverseGeocodingWithGoogle(latitude, longitude)
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);
}*/

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

let chumpChange = getCookie("coins");
if (!chumpChange) {
  chumpChange = 1997;
  setCookie("chumpChange", chumpChange);
} else {
  chumpChange = parseInt(chumpChange);
}

const updateCoinDisplay = (coins) => {
  document.querySelector("#coin-display").textContent = `Coins: ${coins}`; 
}

const updateChumpDisplay = (coins) => {
  document.querySelector("#chump-display").textContent = `Chump Change: ${chumpChange}`; 
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

  let priceHistory = [];

  
  


  console.log(priceHistory);



  anychart.onDocumentReady(function () {

    // create a data set on our data
    var dataSet = anychart.data.set(

    );
  
    // map data for the first series,
    // take x from the zero column and value from the first column
    var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });
  
    // map data for the second series,
    // take x from the zero column and value from the second column
    var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });
  
    // map data for the third series,
    // take x from the zero column and value from the third column
    var thirdSeriesData = dataSet.mapAs({ x: 0, value: 3 });
    
    // map data for the fourth series,
    // take x from the zero column and value from the fourth column
    var fourthSeriesData = dataSet.mapAs({ x: 0, value: 4 });
  
    // create a line chart
    var chart = anychart.line();
  
    // configure the chart title text settings
    //chart.title('Acceptance of same-sex relationships in the US over the last 2 decades');
  
    // set the y axis title
    chart.yAxis().title('COINS');
  
    // create the first series with the mapped data
    var firstSeries = chart.line(firstSeriesData);
    firstSeries.name('Hat 1');
  
    // create the second series with the mapped data
    var secondSeries = chart.line(secondSeriesData);
    secondSeries.name('Hat 2');
  
    // create the third series with the mapped data
    var thirdSeries = chart.line(thirdSeriesData);
    thirdSeries.name('Hat 3');
    
     // create the fourth series with the mapped data
    var fourthSeries = chart.line(fourthSeriesData);
    fourthSeries.name('Hat 4');
  
    // turn the legend on
    chart.legend().enabled(true);
  
    // set the container id for the line chart
    chart.container('container');
    
    // draw the line chart
    chart.draw();

    function startPrice() {
      const iprices = [];

        for (let i = 1; i < 5; i++) {
          const initialPrice = Math.floor(Math.random() * (15000 - 500)) + 500;
          iprices.push(initialPrice); 
          //console.log(initialPrice);
          
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
  
  
  function getData() {
    return [
      ['1990',16.9,12.2,10.2,5.2],
      ['1991',17,17.8,10,4.8],
      ['1993',26.5,23.8,16.8,6.6],
      ['1994',28.7,22,17.3,9.1],
      ['1996',35.7,24,22.6,9.2],
      ['1998',37.2,24.6,22.4,11.2],
      ['2000',36.5,26.2,23.7,9.9],
      ['2002',40,34.4,23.8,16.4],
      ['2004',33.3,28.8,32.5,14.3],
      ['2006',40.2,32.1,27.5,15.1],
      ['2008',49.3,37.2,31.4,17.1],
      ['2010',51.9,42.5,36.1,28.5],
      ['2012',53.1,43.8,36,24.6],
      ['2014',63.7,45.9,44.7,31.3],
      ['2016',66.3,52,42.3,37.2],
      ['2018',70.1,57.7,49.2,39]
    ];
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