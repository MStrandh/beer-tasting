const express = require('express');
const router = express.Router();

const tastings_controller = require('../controllers/tasting.controller');


router.get('/all', tastings_controller.all);
router.post('/create', tastings_controller.create);
router.get('/active', tastings_controller.getActive);

router.get('/:id', tastings_controller.details);
router.get('/:id/numBeers', tastings_controller.getNumBeers);
router.get('/:id/currentBeer', tastings_controller.getCurrentBeer);

module.exports = router;