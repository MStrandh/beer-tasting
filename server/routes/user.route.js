const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/all', user_controller.get_all);
router.post('/create', user_controller.user_create);
router.get('/:id', user_controller.user_details);
router.get('/:fingerprint/fp', user_controller.user_fingerprint);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);


module.exports = router;