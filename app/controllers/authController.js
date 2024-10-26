import { register, login } from '../services/authService.js';

let redirectTo = (path, delay = 3000) => {
  setTimeout(() => {
    window.location.href = `./${path}.html`;
  }, delay);
};

let handleAuthResponse = (action, response) => {
  console.log(`${action} successful:`, response.data);
  showPopup(`${action} successful!`);
};

let handleAuthError = (action, error) => {
  console.error(`${action} failed:`, error.response ? error.response.data : error.message);
  showPopup(`${action} failed. Please try again.`);
};

window.handleRegister = (event) => {
  event.preventDefault();

  let getFormValue = (id) => document.getElementById(id).value;
  let genderSelect = document.getElementById('gender');

  if (genderSelect.value === '') {
    return showPopup('Please select a gender');
  }

  let registerData = {
    email: getFormValue('email'),
    password: getFormValue('password'),
    name: getFormValue('name'),
    phone: getFormValue('phone'),
    gender: genderSelect.value === '1',
  };

  register(registerData)
    .then((response) => {
      handleAuthResponse('Registration', response);
      document.getElementById('registerForm').reset();
      redirectTo('login');
    })
    .catch((error) => handleAuthError('Registration', error));
};

window.handleLogin = (event) => {
  event.preventDefault();

  let loginData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  login(loginData)
    .then((response) => {
      handleAuthResponse('Login', response);
      let { accessToken, email } = response.data.content;
      localStorage.setItem('userToken', accessToken);
      localStorage.setItem('userEmail', email);
      updateUserMenu();
      redirectTo('index');
    })
    .catch((error) => handleAuthError('Login', error));
};

window.handleLogout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userEmail');
  updateUserMenu();
  showPopup('Logged out successfully!');
  redirectTo('login');
};

let getUserMenuContent = () => {
  let userToken = localStorage.getItem('userToken');
  let userEmail = localStorage.getItem('userEmail');

  let userIcon = `<svg class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>`;

  let dropdownArrow = `<svg class="w-4 h-4 text-gray-900 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
  </svg>`;

  return userToken && userEmail
    ? {
        button: `${userIcon}${userEmail}${dropdownArrow}`,
        dropdown: `
          <ul class="p-2 text-start text-sm font-medium text-gray-900">
            <li><a href="#" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">My Profile</a></li>
          </ul>
          <div class="p-2 text-sm font-medium text-gray-900">
            <a href="#" onclick="handleLogout()" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">Sign Out</a>
          </div>`,
      }
    : {
        button: `${userIcon}Account${dropdownArrow}`,
        dropdown: `
          <ul class="p-2 text-start text-sm font-medium text-gray-900">
            <li><a href="./login.html" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">Login</a></li>
            <li><a href="./register.html" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">Register</a></li>
          </ul>`,
      };
};

function updateUserMenu() {
  let { button, dropdown } = getUserMenuContent();
  document.getElementById('userDropdownButton1').innerHTML = button;
  document.getElementById('userDropdown1').innerHTML = dropdown;
}

function showPopup(message) {
  let popup = document.getElementById('myPopup');
  if (!popup) return console.log('Popup element not found');

  popup.textContent = message;
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('hidden'), 3000);
}

document.addEventListener('DOMContentLoaded', updateUserMenu);
