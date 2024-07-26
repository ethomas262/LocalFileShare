const express = require('express');
const router = express.Router();

const messageController = require('../Controllers/messageService.js');
const authController = require('../Controllers/authentication');
const jwt = require('express-jwt');



router .route('/messages').get(messageController.getMessages).post(messageController.addMessage);

router .route('/oldMessages').get(messageController.getLast10);

router .route('/otherMessages/:homeAuthor').get(messageController.getOtherMessages)

router .route("/login").post(authController.login)
router .route("/register").post(authController.register);

module.exports = router;