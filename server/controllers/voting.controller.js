const Voting = require('../models/voting.model');

exports.add = function (req, res) {
	let voting = new Voting(
		{
			tasting: req.body.tasting,
			user: req.body.user,
			beer: req.body.beer,
			tasting_order_no: req.body.tasting_order_no,
			rating: req.body.rating
		}
	);

	voting.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
			message: err.message || "Some error occurred while creating Vote."
		});
	});
};

exports.details = function (req, res) {
	Voting.find({"user": req.params.id})
		.sort({tasting_order_no: 'asc'})
		.populate("tastings")
		.populate("user")
		.populate("beers", ["name", "brewery"])
		.then(voting => {
			if(!voting) {
				return res.status(404).send({
					message: "Voting not found with id " + req.params.id
				});            
			}

			res.send(voting);
		})
		.catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Voting not found with id " + req.params.id
				});                
			}

			return res.status(500).send({
				message: "Error retrieving voting with id " + req.params.id
			});
		});
};