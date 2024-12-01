const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = ""; 
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} (Quantity: ${product.quantity}) 
      <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

function getCartFromSession() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  if (!product) return;

  const cart = getCartFromSession();
  const existingProductIndex = cart.findIndex((p) => p.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCartToSession(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCartFromSession();
  const updatedCart = cart.filter((product) => product.id !== productId);
  saveCartToSession(updatedCart);
  renderCart();
}

function clearCart() {
  saveCartToSession([]);
  renderCart();
}

productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

clearCartButton.addEventListener("click", clearCart);

renderProducts();
renderCart();
