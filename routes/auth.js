const express = require('express'),
    AuthController = require('../controllers/auth');

module.exports = (app) => {
    const authRoutes = express.Router()
    authRoutes.post('/login', AuthController.login);

    app.use('/api/v1', authRoutes);
};
