const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: "Add Products",
    path: '/admin/edit-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    console.log('Created product')
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  req.user
      .getProducts({ where: { id: prodId } })
      // Product.findByPk(prodId)
      .then(products => {
        const product = products[0];
        if(!product) {
          return res.redirect('/');
        }
        res.render('admin/edit-product', {
          pageTitle: "Edit Products",
          path: '/admin/edit-product',
          editing: editMode,
          product: product
        });
      }
    ).catch(
        err => console.error(err.message)
    )
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
      .then(product => {
        if(!product) {
          return res.redirect('/');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        return product.save();
      })
      .then(result => {
        console.log('Updated product');
        res.redirect('/admin/products');
      })
      .catch(err => {
          console.error(err.message);
      });
}

exports.postDeleteProduct = (req, res, next) => {

  Product.findByPk(req.body.productId)
    .then(product => {
      if(!product) {
        return res.redirect('/');
      }
      return product.destroy();
    })
    .then(result => {
      console.log('Deleted product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error(err.message);
    });
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin - List of Products',
          path: '/admin/products'
        })
      console.log('Products fetched successfully');
    }
  )
  .catch(err => {
      console.log(err);
      res.status(500).send('Error fetching products');
    }
  )
}