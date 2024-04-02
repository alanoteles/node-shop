const db = require('../utils/database')

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, description, price, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) values (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description])
  }

  static deleteById(id) {

  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
}