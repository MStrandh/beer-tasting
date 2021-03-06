const express = require('express');
const router = express.Router();

const beer_controller = require('../controllers/beer.controller');

router.get('/all', beer_controller.all);
router.post('/create', beer_controller.create);
router.get('/:id', beer_controller.details);
router.put('/:id/update', beer_controller.update);
router.delete('/:id/delete', beer_controller.delete);


module.exports = router;