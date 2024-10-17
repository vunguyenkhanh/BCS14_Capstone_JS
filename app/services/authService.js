function register(userData) {
  return axios({
    method: 'post',
    url: 'https://shop.cyberlearn.vn/api/Users/signup',
    data: userData,
  });
}

function login(userData) {
  return axios({
    method: 'post',
    url: 'https://shop.cyberlearn.vn/api/Users/signin',
    data: userData,
  });
}


export { register, login };
