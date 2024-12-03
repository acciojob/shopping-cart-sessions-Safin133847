// script.js

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Render products to the product list
const renderProducts = () => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear previous products
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
};

// Add product to the cart
const addToCart = (productId) => {
  const cart = getCartFromSession();
  const product = products.find(p => p.id === productId);

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex(p => p.id === productId);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1; // Increment quantity if product is already in the cart
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
};

// Render cart to the cart list
const renderCart = () => {
  const cartList = document.getElementById('cart-list');
  const cart = getCartFromSession();
  cartList.innerHTML = ''; // Clear previous cart
  cart.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} (Quantity: ${product.quantity})`;
    cartList.appendChild(li);
  });
};

// Get cart data from session storage
const getCartFromSession = () => {
  const cart = sessionStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Clear the cart
document.getElementById('clear-cart-btn').addEventListener('click', () => {
  sessionStorage.removeItem('cart');
  renderCart();
});

// Initial render
renderProducts();
renderCart();
