const Tasting = require('../models/tasting.model');
const Beer = require('../models/beer.model');

exports.all = function (req, res) {
	Tasting.find({})
		.then(tastings => {
			if(!tastings) {
				return res.status(404).send({
					message: "No tastings found"
				});
			}

			res.send(tastings);
		})
		.catch(err => {
			return res.status(500).send({
				message: "Error retrieving tastings"
			});
		});
};

exports.create = async function (req, res) {
	if(!req.body.name) {
		return res.status(400).send({
			message: "Create tasting failed. Name can not be empty."
		});
	}

	//GET TOTAL AMOUNT OF BEERS
	let beerCount = await Beer.count({})
		.then(num => {
			return num;
		});

	// GET ALL BEERS IN RANDOM ORDER
	await Beer.findRandom({}, {}, {limit: beerCount}, 
		function(err, beers) {
			if (err) {
				return res.status(500).send({
					message: "Error retrieving beers."
				});

			} else {
				if(!beers) {
					return res.status(404).send({
						message: "No beers found."
					});
				}

				let beerIds = beers.map(each => each._id);

				// CREATE NEW TASTING
				let tasting = new Tasting(
					{
						name: req.body.name,
						is_active: req.body.is_active,
						current_beer: req.body.current_beer,
						beers: beerIds
					}
				);

				// SAVE TASTING TO DATABASE
				tasting.save()
					.then(data => {
						res.send(data);
					})
					.catch(err => {
						res.status(500).send({
							message: err.message || "Some error occurred while creating Tasting."
						});
				});

				// res.send(beerIds);
			}
		});
};

exports.details = function (req, res) {
	Tasting.findById(req.params.id)
		.populate("beers", ["name", "brewery"])
		.then(tasting => {
			if(!tasting) {
				return res.status(404).send({
					message: "Tasting not found with id " + req.params.id
				});            
			}

			res.send(tasting);
		})
		.catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Tasting not found with id " + req.params.id
				});                
			}

			return res.status(500).send({
				message: "Error retrieving tasting with id " + req.params.id
			});
		});
};
