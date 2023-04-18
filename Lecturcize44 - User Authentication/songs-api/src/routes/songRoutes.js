const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);
router.get('/', songsController.index);

module.exports = router;