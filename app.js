const path = require('path');

const express = require('express');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('68b87a90331f6ab64607a3b3')
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoConnect(() => {
  app.listen(3000)
})