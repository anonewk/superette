const express = require('express'),
    productsRoutes = express.Router(),
    ProductController = require('../controllers/product'),
    JWTGuard = require('../config/passport');

module.exports = (app) => {
    const webAppProductRoutes = express.Router();
    productsRoutes.get('/products', JWTGuard.checkIsAuth, ProductController.getAll);
    productsRoutes.get('/products/:id', JWTGuard.checkIsAuth, ProductController.getById);

    productsRoutes.get('/products/new', JWTGuard.checkIsAuth, ProductController.new);
    productsRoutes.post('/products/create',JWTGuard.checkIsAuth, ProductController.new);

    productsRoutes.get('/products/:id/edit', JWTGuard.checkIsAuth, ProductController.edit);
    productsRoutes.post('/products/:id/update', JWTGuard.checkIsAuth, ProductController.edit);
    productsRoutes.get('/products/:id/edit/status', JWTGuard.checkIsAuth, ProductController.editStatus);
    productsRoutes.post('/products/:id/update/status/:status', JWTGuard.checkIsAuth, ProductController.editStatus);

    productsRoutes.get('/products/:id/delete', JWTGuard.checkIsAuth, ProductController.deleteById);

    app.use('/', productsRoutes);
 //   app.use('/api/v1', productsRoutes);

};
