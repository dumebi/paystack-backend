const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie.controller')


router.get('/all', MovieController.all);

module.exports = router;
