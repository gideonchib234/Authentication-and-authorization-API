const express = require('express');
const router = express.Router();
const { createWallet } = require('../controller/user-wallet-controller');
const authenticate = require('../database/auth');

router.post('/wallet/create', authenticate, createWallet);

module.exports = router;