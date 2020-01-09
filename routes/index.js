const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie.controller')
const { validate_add_comment, validate_movie_id, validate_character_requests } = require('../validations/movie.validation')

router.get('/films', MovieController.films);
router.get('/films/:id/comments', validate_movie_id, MovieController.comments);
router.post('/films/:id/comments', validate_movie_id, validate_add_comment, MovieController.addComment);

router.get('/characters', validate_character_requests, MovieController.characters);
module.exports = router;
