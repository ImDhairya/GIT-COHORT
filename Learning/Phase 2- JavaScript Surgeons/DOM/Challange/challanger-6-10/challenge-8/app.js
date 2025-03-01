const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];

function updateCart() {
  cartItemsContainer.innerHTML = ""; // Clear cart UI
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Cart is empty</div>';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <div class="quantity-controls">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function addToCart(name, price) {
  let existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({name, price, quantity: 1});
  }
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateQuantity(index, change) {
  if (cart[index].quantity + change > 0) {
    cart[index].quantity += change;
  } else {
    removeFromCart(index);
    return;
  }
  updateCart();
}

// Initial call to set up the empty cart message
updateCart();
