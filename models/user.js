const {ObjectId} = require("mongodb");
const getDb = require('../utils/database').getDb

class User {
  constructor(username, email) {
    this.name = username
    this.mail = email
  }

  save() {
    const db = getDb()

    return db
      .collection('users')
      .insertOne(this)
      .then(result => {
        console.log('Then USERS...')
        console.log('User inserted')
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  static findById(userId) {
    const db = getDb()

    return db
      .collection('users')
      .findOne({_id: new ObjectId(userId)})
      .then( result => {
        return result
        }
      )
      .catch(err => {
        console.log('User not found')
        throw err
      })
  }
}

module.exports = User;