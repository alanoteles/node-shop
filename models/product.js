const mongodb = require('mongodb')
const {ObjectId} = require("mongodb");
const getDb = require('../utils/database').getDb

class Product {
  constructor(title, price, description, imageUrl, id, userId) {

    console.log('--id--', id)
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id ? new ObjectId(id) : null
    this.userId = userId
  }

  save() {
    const db = getDb()
    let dbOp
    console.log('Saving...', this._id)
    if(this._id){
      console.log('--IF--')
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id}, { $set: this})
    } else {
      console.log('--ELSE--')
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
      .then( result => {
        console.log('inseirdo')
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb()
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log('Porducts: ')
        console.log(products)
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById(prodId) {
    const db = getDb()
    console.log('prodid: ', prodId)
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log('Here...')
        console.log(product)
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteById(prodId) {
    const db = getDb()
    return db
      .collection('products')
      .deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log('Product deleted successfully')
      })
      .catch(err => {
        console.log(err)
      })
  }

}

module.exports = Product;