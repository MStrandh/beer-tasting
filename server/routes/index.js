const express = require("express");
const path = require('path');

const router = express.Router();


router.get("/", (req, res) => {
	res.send({ response: "Beer Tasting" }).status(200);
});

router.get('/beer/getList', (req, res) => {
    var list = [
    	{
    		"Brewery": "Samuel Adams",
    		"Name": "Boston Lager"
    	},
    	{
    		"Brewery": "Brooklyn Brewery",
    		"Name": "Brooklyn Lager"
    	},
    	{
    		"Brewery": "Brömsebrobryggeri",
    		"Name": "Stor stark"
    	}
	];
    res.json(list);

    console.log('Sent list of items');
});

router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

module.exports = router;