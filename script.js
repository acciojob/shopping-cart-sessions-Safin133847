const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ''; // Clear existing product list

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cart = getCartFromSessionStorage();
  
  cartList.innerHTML = ''; // Clear existing cart list

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
    });
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  const cart = getCartFromSessionStorage();

  cart.push(product);

  sessionStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
}

function getCartFromSessionStorage() {
  const cart = sessionStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function clearCart() {
  sessionStorage.removeItem('cart');

  renderCart();
}

document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

function initializePage() {
  renderProducts();
  renderCart();
}

window.onload = initializePage;
