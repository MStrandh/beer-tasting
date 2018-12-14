const express = require('express');
const router = express.Router();

const votings_controller = require('../controllers/voting.controller');


router.get('/user/:id', votings_controller.user_details);
router.post('/user/cast', votings_controller.user_cast);

router.put('/:id/update', votings_controller.vote_update);


module.exports = router;