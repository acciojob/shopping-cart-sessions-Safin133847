// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Function to render the product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to render the cart from sessionStorage
function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = "";
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} x ${product.quantity} - $${product.price * product.quantity} <button class="remove-from-cart-btn" data-id="${(link unavailable)}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Function to get the cart from sessionStorage or return an empty array
function getCartFromSession() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Function to save the cart to sessionStorage
function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add an item to the cart (without quantity)
function addToCart(productId) {
  const product = products.find((product) => (link unavailable) === productId);
  if (!product) return;
  const cart = getCartFromSession();
  const existingProductIndex = cart.findIndex((item) => (link unavailable) === (link unavailable));
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCartToSession(cart);
  renderCart();
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  const cart = getCartFromSession();
  const existingProductIndex = cart.findIndex((item) => (link unavailable) === productId);
  if (existingProductIndex !== -1) {
    if (cart[existingProductIndex].quantity > 1) {
      cart[existingProductIndex].quantity--;
    } else {
      cart.splice(existingProductIndex, 1);
    }
  }
  saveCartToSession(cart);
  renderCart();
}

// Function to clear the cart
function clearCart() {
  saveCartToSession([]);
  renderCart();
}

// Event listener for adding items to the cart
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listener for removing items from the cart
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

// Event listener for clearing the cart
clearCartButton.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
