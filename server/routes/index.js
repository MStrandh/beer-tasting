const express = require("express");
const path = require('path');

const router = express.Router();

router.get("/", (req, res) => {
	res.send({ response: "Beer Tasting" }).status(200);
});

router.get('/beer/getCurrent', (req, res) => {
    var list = ["Samuel Adams Lager", "Brooklyn Lager", "Brömsebrobrygg"];
    res.json(list);

    console.log('Sent list of items');
});

router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

module.exports = router;