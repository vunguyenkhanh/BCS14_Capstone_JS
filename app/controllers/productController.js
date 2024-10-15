import { getDataAPI } from '../services/productService.js';
import { ProductModel } from '../models/productModel.js';
import { CartModel } from '../models/cartModel.js';

let cartModel = new CartModel();
let cart = cartModel.arrCart;
let productList = [];

function formatProductName(productName) {
  return productName
    .split(' ')
    .map((word) => {
      if (word.length === 2) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function renderProductList(productList) {
  let content = '';
  productList.map(function (product, index) {
    let productItem = `
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div class="h-56 w-full">
              <a href="../views/productDetail.html">
                <img class="mx-auto h-full" src="${product.image}" alt="" />
              </a>
            </div>
            <div class="pt-6">
              <div class="mb-4 flex items-center justify-between gap-4">
                <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                  Up to 35% off
                </span>

                <div class="flex items-center justify-end gap-1">
                <a href="../views/productDetail.html">
                  <button
                    type="button"
                    data-tooltip-target="tooltip-quick-look"
                    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <span class="sr-only">Quick look</span>
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                      <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                </a>
                  <div
                    id="tooltip-quick-look"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
                    data-popper-placement="top">
                    Quick look
                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                  </div>
                </div>
              </div>

              <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline">${formatProductName(
                product.name,
              )}</a>

              <div class="mt-2 flex items-center gap-2">
                <div class="flex items-center">
                  <svg
                    class="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>

                  <svg
                    class="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>

                  <svg
                    class="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>

                  <svg
                    class="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>

                  <svg
                    class="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>
                </div>

                <p class="text-sm font-medium text-gray-900">5.0</p>
                <p class="text-sm font-medium text-gray-500">(455)</p>
              </div>

              <ul class="mt-2 flex items-center gap-4">
                <li class="flex items-center gap-2">
                  <svg
                    class="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                  </svg>
                  <p class="text-sm font-medium text-gray-500">Fast Delivery</p>
                </li>

                <li class="flex items-center gap-2">
                  <svg
                    class="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                  <p class="text-sm font-medium text-gray-500">Best Price</p>
                </li>
              </ul>

              <div class="mt-4 flex items-center justify-between gap-4">
                <p class="text-2xl font-extrabold leading-tight text-gray-900">$${product.price}</p>

                <button
                  type="button"
                  class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  onclick="addToCart(${product.id})">
                  <svg
                    class="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
    `;
    content += productItem;
  });
  document.getElementById('productList').innerHTML = content;
}

function getProductList() {
  getDataAPI()
    .then((result) => {
      productList = result.data.content.map(
        (product) =>
          new ProductModel(
            product.id,
            product.name,
            product.price,
            product.description,
            product.size,
            product.shortDescription,
            product.quantity,
            product.deleted,
            product.categories,
            product.relatedProducts,
            product.feature,
            product.image,
          ),
      );
      console.log('Product List:', productList); // Log the product list
      renderProductList(result.data.content);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

window.onload = function () {
  getProductList();
  loadCartFromLocalStorage();
};

window.addToCart = function (productId) {
  console.log(`Adding product with ID: ${productId}`);
  let product = getProductById(productId);
  if (!product) {
    return;
  }

  let existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  console.log('Cart:', cart);
  saveCartToLocalStorage();
  updateCartUI();
  showCartPopup();
  updateCartCount();
};

function showCartPopup() {
  const popup = document.getElementById('cartPopup');
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 2000);
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function getProductById(productId) {
  return productList.find((product) => product.id === productId);
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  let cartElement = document.getElementById('myCart');
  let viewCartButton = document.getElementById('viewCartButton');

  if (cart.length === 0) {
    cartElement.innerHTML = `
      <div class="flex flex-col items-center justify-center p-4">
        <svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18M9 3v18m6-18v18M4 21h16M4 7h16M4 11h16M4 15h16"></path>
        </svg>
        <p class="mt-4 text-lg font-semibold text-gray-500">Your cart is empty</p>
        <a href="#products" class="mt-2 text-primary-600 hover:underline">Continue Shopping</a>
      </div>
    `;
    viewCartButton.style.display = 'none';
    return;
  } else {
    viewCartButton.style.display = 'inline-flex';
  }

  cartElement.innerHTML = cart
    .map(
      (item) => `
    <div class="flex items-center justify-between p-2">
      <img class="h-10 w-10 rounded" src="${item.image}" alt="${item.name}" />
      <div class="flex-1 mx-4">
        <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900 hover:underline">
          ${formatProductName(item.name)}
        </a>
        <p class="mt-0.5 truncate text-sm font-normal text-gray-500">$${item.price}</p>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <button type="button" class="text-gray-600 hover:text-gray-700" onclick="decreaseQuantity(${item.id})">
            <span class="sr-only">Decrease quantity</span>
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
            </svg>
          </button>
          <p class="text-sm font-normal leading-none text-gray-500">Qty: <span class="text-sm font-semibold leading-none text-gray-900">${
            item.quantity
          }</span></p>
          <button type="button" class="text-gray-600 hover:text-gray-700" onclick="increaseQuantity(${item.id})">
            <span class="sr-only">Increase quantity</span>
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <button type="button" class="text-red-600 hover:text-red-700" onclick="removeFromCart(${item.id})">
          <span class="sr-only">Remove</span>
          <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  `,
    )
    .join('');
}

function loadCartFromLocalStorage() {
  let savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
    updateCartCount();
  }
}

window.decreaseQuantity = function (productId) {
  let product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity--;
    if (product.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    saveCartToLocalStorage();
    updateCartUI();
    updateCartCount(); // Cập nhật số lượng giỏ hàng
  }
};

window.increaseQuantity = function (productId) {
  let product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity++;
    saveCartToLocalStorage();
    updateCartUI();
    updateCartCount(); // Cập nhật số lượng giỏ hàng
  }
};

window.removeFromCart = function (productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCartToLocalStorage();
  updateCartUI();
  updateCartCount(); // Cập nhật số lượng giỏ hàng
};
