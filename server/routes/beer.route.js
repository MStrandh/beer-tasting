const express = require('express');
const router = express.Router();

const beer_controller = require('../controllers/beer.controller');

router.get('/all', beer_controller.all);
router.post('/create', beer_controller.create);
router.get('/:id', beer_controller.details);
// router.put('/:id/update', user_controller.user_update);
// router.delete('/:id/delete', user_controller.user_delete);


module.exports = router;