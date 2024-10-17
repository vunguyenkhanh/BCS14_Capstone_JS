import { register, login } from '../services/authService.js';

window.handleRegister = function (event) {
  event.preventDefault();

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let genderSelect = document.getElementById('gender');
  let gender = genderSelect.value === '1';

  if (genderSelect.value === '') {
    showPopup('Please select a gender');
    return;
  }

  let registerData = {
    email,
    password,
    name,
    gender,
    phone,
  };

  register(registerData)
    .then((response) => {
      console.log('Registration successful:', response.data);
      showPopup('Registration successful!');
      document.getElementById('registerForm').reset();
      setTimeout(() => {
        window.location.href = './login.html';
      }, 3000);
    })
    .catch((error) => {
      console.error(
        'Registration failed:',
        error.response ? error.response.data : error.message,
      );
      showPopup('Registration failed. Please try again.');
    });
};

function updateUserMenu() {
  const userDropdown = document.getElementById('userDropdown1');
  const userDropdownButton = document.getElementById('userDropdownButton1');
  const userToken = localStorage.getItem('userToken');
  const userEmail = localStorage.getItem('userEmail');

  if (userToken && userEmail) {
    userDropdownButton.innerHTML = `
      <svg class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      ${userEmail}
      <svg class="w-4 h-4 text-gray-900 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
      </svg>
    `;

    userDropdown.innerHTML = `
      <ul class="p-2 text-start text-sm font-medium text-gray-900">
        <li>
          <a href="#" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
            My Profile
          </a>
        </li>
      </ul>
      <div class="p-2 text-sm font-medium text-gray-900">
        <a
          href="#"
          onclick="handleLogout()"
          class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
          Sign Out
        </a>
      </div>
    `;
  } else {
    // Người dùng chưa đăng nhập
    userDropdownButton.innerHTML = `
      <svg class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      Account
      <svg class="w-4 h-4 text-gray-900 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
      </svg>
    `;

    userDropdown.innerHTML = `
      <ul class="p-2 text-start text-sm font-medium text-gray-900">
        <li>
          <a
            href="./login.html"
            class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
            Login
          </a>
        </li>
        <li>
          <a
            href="./register.html"
            class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
            Register
          </a>
        </li>
      </ul>
    `;
  }
}

window.handleLogin = function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login({ email, password })
    .then((response) => {
      console.log('Login response:', response.data);
      console.log('Login successful:', response.data);
      showPopup('Login successful!');
      localStorage.setItem('userToken', response.data.content.accessToken);
      localStorage.setItem('userEmail', response.data.content.email);
      updateUserMenu();
      setTimeout(() => {
        window.location.href = './index.html';
      }, 3000);
    })
    .catch((error) => {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message,
      );
      showPopup('Login failed. Please check your credentials and try again.');
    });
};

window.handleLogout = function () {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userEmail');
  updateUserMenu();
  showPopup('Logged out successfully!');
  setTimeout(() => {
    window.location.href = './login.html';
  }, 2000);
};

function showPopup(message) {
  let popup = document.getElementById('myPopup');
  if (popup) {
    popup.textContent = message;
    popup.classList.remove('hidden');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 3000);
  } else {
    console.log('Popup element not found');
  }
}

document.addEventListener('DOMContentLoaded', updateUserMenu);
