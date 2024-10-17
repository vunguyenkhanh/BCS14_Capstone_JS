import {
  getAllProduct,
  getCategoryAPI,
  getProductByCategory,
  getProductDetail,
} from '../services/productService.js';
import { ProductModel } from '../models/productModel.js';
import { CartModel } from '../models/cartModel.js';

let cartModel = new CartModel();
let cart = cartModel.arrCart;
let productList = [];

function formatProductName(productName) {
  if (!productName || typeof productName !== 'string') {
    return ''; // Return an empty string or some default value
  }
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
              <a href="../views/productDetail.html?productid=${product.id}">
                <img class="mx-auto h-full" src="${product.image}" alt="" />
              </a>
            </div>
            <div class="pt-6">
              <div class="mb-4 flex items-center justify-between gap-4">
                <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                  Up to 35% off
                </span>

                <div class="flex items-center justify-end gap-1">
                <a href="../views/productDetail.html?productid=${product.id}">
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
                <p class="text-2xl font-extrabold leading-tight text-gray-900">$${
                  product.price
                }</p>

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

  let productListElement = document.getElementById('productList');
  if (productListElement) {
    productListElement.innerHTML = content;
  } else {
    // console.error('Element with ID "productList" not found.');
  }
}

function getProductList() {
  getAllProduct()
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
      // console.log('Product List:', productList);
      renderProductList(result.data.content);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

window.onload = function () {
  loadCartCount();
  loadCartFromLocalStorage();

  if (window.location.pathname.includes('productDetail.html')) {
    getProductDetailById();
  } else {
    getProductList();
    getCategoryList();
  }
};

window.addToCart = function (productId) {
  getProductById(productId).then((product) => {
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

    saveCartToLocalStorage();
    updateCartUI();
    showPopup('Product added to cart!');
    updateCartCount();
  });
};

function showPopup(message) {
  let popup = document.getElementById('myPopup');
  if (popup) {
    popup.textContent = message;
    popup.classList.remove('hidden');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 2000);
  } else {
    // console.log('Element with ID "cartPopup" not found.');
  }
}

function loadCartCount() {
  let cartCount = localStorage.getItem('cartCount');
  if (cartCount) {
    document.getElementById('cartCount').textContent = cartCount;
  }
}

function updateCartCount() {
  let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cartCount').textContent = cartCount;
  localStorage.setItem('cartCount', cartCount);
}

function getProductById(productId) {
  let product = productList.find((product) => product.id === productId);
  if (product) {
    return Promise.resolve(product);
  }
  // If not found in productList, fetch from API
  return getProductDetail(productId)
    .then((result) => {
      return new ProductModel(
        result.data.content.id,
        result.data.content.name,
        result.data.content.price,
        result.data.content.description,
        result.data.content.size,
        result.data.content.shortDescription,
        result.data.content.quantity,
        result.data.content.deleted,
        result.data.content.categories,
        result.data.content.relatedProducts,
        result.data.content.feature,
        result.data.content.image,
      );
    })
    .catch((error) => {
      console.error('Error fetching product:', error);
      return null;
    });
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem(
    'cartCount',
    cart.reduce((total, item) => total + item.quantity, 0),
  );
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
        <p class="mt-0.5 truncate text-sm font-normal text-gray-500">$${
          item.price * item.quantity
        }</p>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <button type="button" class="text-gray-600 hover:text-gray-700" onclick="decreaseQuantity(${
            item.id
          })">
            <span class="sr-only">Decrease quantity</span>
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
            </svg>
          </button>
          <p class="text-sm font-normal leading-none text-gray-500">Qty: <span class="text-sm font-semibold leading-none text-gray-900">${
            item.quantity
          }</span></p>
          <button type="button" class="text-gray-600 hover:text-gray-700" onclick="increaseQuantity(${
            item.id
          })">
            <span class="sr-only">Increase quantity</span>
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <button type="button" class="text-red-600 hover:text-red-700" onclick="removeFromCart(${
          item.id
        })">
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

function updateCartDetailUI() {
  let cartDetailElement = document.getElementById('myCartDetail');

  if (cartDetailElement) {
    if (cart.length === 0) {
      cartDetailElement.innerHTML = `
      <div class="flex flex-col items-center justify-center p-4">
        <svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18M9 3v18m6-18v18M4 21h16M4 7h16M4 11h16M4 15h16"></path>
        </svg>
        <p class="mt-4 text-lg font-semibold text-gray-500">Your cart is empty</p>
        <a href="./index.html#products" class="mt-2 text-primary-600 hover:underline">Continue Shopping</a>
      </div>
    `;
      return;
    } else {
      cartDetailElement.innerHTML = cart
        .map(
          (item) => `
              <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="shrink-0 md:order-1">
                    <img class="h-20 w-20" src="${item.image}" alt="${
            item.name
          }" />
                  </a>

                  <label for="counter-input" class="sr-only">Choose quantity:</label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button-2"
                        data-input-counter-decrement="counter-input-2"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        onclick="decreaseQuantity(${item.id})">
                        <svg
                          class="h-2.5 w-2.5 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="counter-input-2"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                        placeholder=""
                        value="${item.quantity}"
                        required />
                      <button
                        type="button"
                        id="increment-button-2"
                        data-input-counter-increment="counter-input-2"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        onclick="increaseQuantity(${item.id})">
                        <svg
                          class="h-2.5 w-2.5 text-gray-900"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900">$${
                        item.price * item.quantity
                      }</p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href="#" class="text-base font-medium text-gray-900 hover:underline">
                    ${formatProductName(item.name)}
                    </a>

                    <div class="flex items-center gap-4">
                      <button
                        type="button"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        onclick="removeFromCart(${item.id})">
                        <svg
                          class="me-1.5 h-5 w-5"
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
                            d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  `,
        )
        .join('');
    }
  } else {
    // console.error('Element with ID "myCartDetail" not found.');
  }
}

function loadCartFromLocalStorage() {
  let savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
    updateCartDetailUI();
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
    updateCartDetailUI();
    updateCartCount();
  }
};

window.increaseQuantity = function (productId) {
  let product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity++;
    saveCartToLocalStorage();
    updateCartUI();
    updateCartDetailUI();
    updateCartCount();
  }
};

window.removeFromCart = function (productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCartToLocalStorage();
  updateCartUI();
  updateCartDetailUI();
  updateCartCount();
};

function getCategoryList() {
  getCategoryAPI()
    .then((result) => {
      let categoryList = result.data.content;
      let categoryElement = document.getElementById('brand');
      if (categoryElement) {
        let content = categoryList
          .map(
            (cat) => `
          <div class="flex items-center">
            <input
              id="${cat.id}"
              type="checkbox"
              value="${cat.id}"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500" />

            <label for="${
              cat.id
            }" class="ml-2 text-sm font-medium text-gray-900">${
              cat.category
            } (${JSON.parse(cat.productList).length})</label>
          </div>
        `,
          )
          .join('');
        categoryElement.innerHTML = content;
      } else {
        // console.error('Element with ID "brand" not found.');
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

function getSelectedCategories() {
  let checkboxes = document.querySelectorAll(
    '#brand input[type="checkbox"]:checked',
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

let showResultButton = document.getElementById('showResultButton');
if (showResultButton) {
  showResultButton.addEventListener('click', (event) => {
    event.preventDefault();

    let selectedCategories = getSelectedCategories();
    if (selectedCategories.length > 0) {
      getProductByCategory(selectedCategories)
        .then((results) => {
          // Flatten the array of arrays
          let productList = results.map((result) => result.data.content).flat();
          showPopup('Products filtered successfully!');
          renderProductList(productList);
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      getAllProduct()
        .then((result) => {
          let productList = result.data.content;
          showPopup('Products filtered successfully!');
          renderProductList(productList);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  });
}

function getProductDetailById() {
  let urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('productid');

  if (!productId) {
    console.error('Product ID not found in URL');
    return;
  }

  getProductDetail(productId)
    .then((result) => {
      let product = result.data.content;
      renderProductDetail(product);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

function renderProductDetail(product) {
  let productDetailElement = document.getElementById('productDetail');
  let cleanedDescription = product.description.replace(/about this shoe:/i, '');

  if (!productDetailElement) {
    console.error('Product detail element not found');
    return;
  }

  productDetailElement.innerHTML = `
    <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
    <img class="w-full" src="${product.image}" alt="" />
    </div>

    <div class="mt-6 sm:mt-8 lg:mt-0">
    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
    ${formatProductName(product.name)}
    </h1>
    <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
      <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">$${
        product.price
      }</p>

      <div class="flex items-center gap-2 mt-2 sm:mt-0">
      <div class="flex items-center gap-1">
        <svg
        class="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
        <svg
        class="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
        <svg
        class="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
        <svg
        class="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
        <svg
        class="w-4 h-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
      </div>
      <p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">(5.0)</p>
      <a
        href="#"
        class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
        345 Reviews
      </a>
      </div>
    </div>

    <div class="mt-6 flex items-center space-x-4">
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Quantity
        </label>
        <div class="flex mt-1">
          <button
            type="button"
            class="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            onclick="decreaseDetailQuantity()">
            -
          </button>
          <input
            type="text"
            id="detailQuantity"
            name="quantity"
            value="1"
            class="text-center w-12 border-t border-b border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          <button
            type="button"
            class="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            onclick="increaseDetailQuantity()">
            +
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
      <a
        href="#"
        title=""
        class="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
        role="button"
        onclick="addToCartFromDetail(${product.id})">
        <svg
          class="w-5 h-5 -ms-2 me-2"
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
      </a>
    </div>

    <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

    <p class="mb-6 text-gray-500 dark:text-gray-400">
      ${cleanedDescription}
    </div>
  `;
}

// Add these new functions
window.decreaseDetailQuantity = function () {
  let quantityInput = document.getElementById('detailQuantity');
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
};

window.increaseDetailQuantity = function () {
  let quantityInput = document.getElementById('detailQuantity');
  let currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
};

window.addToCartFromDetail = function (productId) {
  let quantityInput = document.getElementById('detailQuantity');
  let quantity = parseInt(quantityInput.value);

  getProductById(productId).then((product) => {
    if (!product) {
      console.error('Product not found');
      return;
    }

    let existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    saveCartToLocalStorage();
    updateCartUI();
    showPopup('Product added to cart!');
    updateCartCount();
  }).catch((error) => {
    // console.error('Error adding product to cart:', error);
  });
};