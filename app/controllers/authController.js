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
    })
    .catch((error) => {
      console.error(
        'Registration failed:',
        error.response ? error.response.data : error.message,
      );
      showPopup('Registration failed. Please try again.');
    });
};

window.handleLogin = function (event) {
  event.preventDefault();

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  let loginData = {
    email,
    password,
  };

  login(loginData)
    .then((response) => {
      console.log('Login successful:', response.data);
      showPopup('Login successful!');
      localStorage.setItem('userToken', response.data.accessToken);
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
