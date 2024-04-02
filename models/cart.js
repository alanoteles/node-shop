const fs = require('fs');
const path = require('path');
const {filters} = require("pug");

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;

      } else {
        updatedProduct = {id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      console.log('delete: ', id)
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty - 1;

      if (productQty === 0) {
        updatedCart.products = [];
        updatedCart.totalPrice = 0;
      } else {
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
        updatedCart.products[0].qty = productQty;
      }


      console.log('updated: ', updatedCart)
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      // console.log(cart);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }

    })
  }
}