const path = require('path');

const express = require('express');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.use((req, res, next) => {
  console.log("Middleware called...");
})

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
    .sync()
    .then(result => {
      return User.findByPk(1)
    })
    .then(user => {
      if (!user) {
        return User.create({name: 'Max', email: 'test@test.com'})
      }
      return user
    })
    .then(user => {
      console.log('Sync Ok');
      app.listen(3000);
    })
    .catch(err => {
      console.log(err);
    });
