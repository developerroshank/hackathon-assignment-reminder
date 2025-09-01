const express = require('express');
const { homeController, loginController, signUpController, content } = require("../controllers/authController.js");
const { authMiddlewareName, authMiddlewareRole } = require("../middlewares/authMiddleware.js");

const router = express.Router();


router.get('/', homeController);
// router.post('/login', authMiddlewareName, authMiddlewareRole, loginController);
router.post('/signup', signUpController);
router.post('/login', loginController);
router.get('/userdata', content);

module.exports = { router }