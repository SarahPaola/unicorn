document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const basketOverlay = document.getElementById("basket-overlay");
    const closeOverlayBtn = document.getElementById("close-overlay");
    const cartButton = document.getElementById("cart-button");
    const basketItemsList = document.getElementById("basket-items");
    const orderValueElement = document.getElementById("order-value");
    const orderTotalElement = document.getElementById("order-total");
  // Function: Array to store the basket items
    let basket = [];
  
  // Function: Updates the badge showing the number of items in the basket  
    const updateBasketBadge = () => {
        const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
        const basketBadge = document.getElementById("basket-badge");

      //Control Flow: if-else to handle badge visibility
        if (totalItems > 0) {
          basketBadge.textContent = totalItems;
          basketBadge.style.visibility = "visible";
        } else {
          basketBadge.style.visibility = "hidden";
        }
      };

      // Function: Updated the headline count in the overlay
    const updateOverlayHeadlineCount = () => {
     const basketCount = document.getElementById("basket-count-overlay"); // Reference the headline count element
     const totalItems = basket.reduce((total, item) => total + item.quantity, 0); // Calculate the total number of items
     basketCount.textContent = totalItems; // DOM manipulation: Update the headline count
     console.log("Updating headline count:", totalItems); // Debugging
  };
  
  // Function to Populate Basket Overlay
  const populateBasketOverlay = () => {
    basketItemsList.innerHTML = "";
    let orderValue = 0;

  //loop: Iterate over items in basket array 
    basket.forEach((item, index) => {
      const li = document.createElement("li"); //DOM manipulation: creating elements
      li.innerHTML = `
        <div>
          <p>${item.name} - ${item.price} DKK x ${item.quantity}</p>
          <div class="quantity-controls">
            <button class="decrease-btn" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn" data-index="${index}">+</button>
          </div>
        </div>
      `;
      basketItemsList.appendChild(li); //DOM Manipulation: Appending elements
      orderValue += item.price * item.quantity;
    });
  //DOM manipulation: Updating the order value and total 
    orderValueElement.textContent = `${orderValue} DKK`;
    orderTotalElement.textContent = `${orderValue} DKK`;
    updateOverlayHeadlineCount();

  
    // Attach event listeners to buttons in the basket
    const decreaseButtons = document.querySelectorAll(".decrease-btn");
    const increaseButtons = document.querySelectorAll(".increase-btn");
  
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index"); //DOM manipulation 
        decreaseQuantity(index);
        updateOverlayHeadlineCount();

      });
    });
  
    increaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        increaseQuantity(index);
        updateOverlayHeadlineCount();

      });
    });
  };
  
  // Function to Add Item to Basket
  const addItemToBasket = (productElement) => {
    const productName = productElement.querySelector("h3").textContent;
    const productPrice = parseFloat(
      productElement.querySelector("p").textContent.replace(",", ".")
    );
// Control Flow: Check if item exist in the basket
    const existingItem = basket.find((item) => item.name === productName);
    if (existingItem) {
      existingItem.quantity += 1; //Increment quantity 
    } else {
      basket.push({ name: productName, price: productPrice, quantity: 1 });
    }

    console.log("Basket:", basket);
    populateBasketOverlay();
    updateBasketBadge();
    updateOverlayHeadlineCount(); // Update the headline count
  };
// Function: Decrease quantity of an item 
  const decreaseQuantity = (index) => {
    if (basket[index].quantity > 1) {
      basket[index].quantity--;
    } else {
      basket.splice(index, 1); // Remove the item if quantity becomes 0
    }
    populateBasketOverlay(); // Refresh the overlay
    updateBasketBadge(); // Update the badge
    updateOverlayHeadlineCount(); // Update the headline count
  };

  const increaseQuantity = (index) => {
    basket[index].quantity++;
    populateBasketOverlay(); // Refresh the overlay
    updateBasketBadge(); // Update the badge
    updateOverlayHeadlineCount(); // Update the headline count
  };

   // Attach Event Listeners to Product Buttons
   const productElements = document.querySelectorAll(".product");
   productElements.forEach((productElement) => {
     const addButton = productElement.querySelector(".add-to-basket");
     addButton.addEventListener("click", () => addItemToBasket(productElement));
   });

    // Function to Open the Basket Overlay
    const openBasketOverlay = () => {
      populateBasketOverlay();
      basketOverlay.classList.add("active");
    };
  
    // Function to Close the Basket Overlay
    const closeBasketOverlay = () => {
      basketOverlay.classList.remove("active");
    };
  
    // Event Listeners for Overlay
    cartButton.addEventListener("click", openBasketOverlay);
    closeOverlayBtn.addEventListener("click", closeBasketOverlay);
  });

  basket.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <p>${item.name} - ${item.price} DKK x ${item.quantity}</p>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
      </div>
    `;
    basketItemsList.appendChild(li);
    orderValue += item.price * item.quantity;
  });
  
  