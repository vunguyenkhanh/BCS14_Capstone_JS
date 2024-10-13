function getDataAPI() {
  return axios({
    method: 'get',
    url: 'https://shop.cyberlearn.vn/api/Product',
  });
}

export { getDataAPI };