
    let hats = [];
    let inventory = [];
    const priceRange = { min: 500, max: 15000 };

    function randomInRange(range) {
        return Math.random() * (range.max - range.min) + range.min;
    }

    function updatePrices(prices) {
        return prices.map(price => {
            const randomPercent = 0.05; 
            const change = 1 + (Math.random() * 2 - 1) * randomPercent;
            return price * change;
        });
    }

    function createHats(range) {
        for (let i = 0; i < 10; i++) {
            const price = randomInRange(range);
            hats.push({ id: i, price: price });
        }
    }

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
                updateInventory();
            };
            
            listItem.textContent = `Hat ${hat.id + 1}: $${hat.price.toFixed(2)} `;
            listItem.appendChild(buyButton);
            stockTicker.appendChild(listItem);
        }
    }

    function updateInventory() {
        const inventoryList = document.getElementById('inventoryList');
        inventoryList.innerHTML = '';

        for (let hat of inventory) {
            const listItem = document.createElement('li');
            listItem.textContent = `Hat ${hat.id + 1}: $${hat.price.toFixed(2)} x${hat.quantity}`;
            inventoryList.appendChild(listItem);
        }
    }

    function openHatStockMarket() {
        document.getElementById('hatStockMarket').style.display = 'block';
    }

    function closeHatStockMarket() {
        document.getElementById('hatStockMarket').style.display = 'none';
    }

    window.onload = function() {
        createHats(priceRange);
        
        const openButton = document.createElement('button');
        openButton.textContent = 'Open Hat Stock Market';
        openButton.onclick = openHatStockMarket;
        document.body.appendChild(openButton);

        setInterval(() => {
            hats = hats.map(hat => {
                const newPrice = updatePrices([hat.price])[0];
                return { ...hat, price: newPrice };
            });
            updateStockTicker();
        }, 5000);

        updateStockTicker();
    };
