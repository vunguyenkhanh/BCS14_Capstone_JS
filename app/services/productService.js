function getAllProduct() {
  return axios({
    method: 'get',
    url: 'https://shop.cyberlearn.vn/api/Product',
  });
}

function getCategoryAPI() {
  return axios({
    method: 'get',
    url: `https://shop.cyberlearn.vn/api/Product/getAllCategory`,
  });
}

function getProductByCategory(categoryIds) {
  const promises = categoryIds.map((categoryId) =>
    axios({
      method: 'get',
      url: `https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=${categoryId}`,
    }),
  );
  return Promise.all(promises);
}

export { getAllProduct, getCategoryAPI, getProductByCategory };
