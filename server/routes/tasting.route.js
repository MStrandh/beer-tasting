const express = require('express');
const router = express.Router();

const tastings_controller = require('../controllers/tasting.controller');


router.get('/all', tastings_controller.all);
router.post('/create', tastings_controller.create);
router.get('/:id', tastings_controller.details);


module.exports = router;