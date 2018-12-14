const express = require('express');
const router = express.Router();

const votings_controller = require('../controllers/voting.controller');


router.get('/:id', votings_controller.details);
router.post('/add', votings_controller.add);


module.exports = router;