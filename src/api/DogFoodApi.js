class DogFoodApi {
  constructor({ baseUrl }) {
    this.path = baseUrl;
  }
  getProducts(token, search) {
    return fetch(`${this.path}/products/search?query=` + search, {
      headers: {
        "content-type": "application/json",
        authorization: token, 
      },
    });
  }
  getProductsById(token, id) {
    return fetch(`${this.path}/products/` + id, {
      headers: {
        "content-type": "application/json",
        authorization: token, 
      },
    });
  }
  сreateProduct(token, values) {
    return fetch(`${this.path}/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(values), 
    });
  }
  editProduct(token, values, productId) {
    return fetch(`${this.path}/products/` + productId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(values), 
    });
  }
  getReviews(token, productId) {
    return fetch(`${this.path}/products/review/` + productId, {
      headers: {
        "content-type": "application/json",
        authorization: token, 
      },
    });
  }
  delProduct(token, productId) {
    return fetch(`${this.path}/products/` + productId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: token, 
      },
    });
  }
  addReview(token, review, productId) {
    return fetch(`${this.path}/products/review/` + productId, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(review), 
    });
  }
  signin(values) {
    return fetch(`${this.path}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), 
    });
  }
  signup(values) {
    return fetch(`${this.path}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  }
}
export const Api = new DogFoodApi({ baseUrl: "https://api.react-learning.ru" });
