const Voting = require('../models/voting.model');

exports.user_cast = function (req, res) {
	let voting = new Voting(
		{
			tasting: req.body.tasting,
			user: req.body.user,
			tasting_order_no: req.body.tasting_order_no,
			beer: req.body.beer,
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

exports.user_getVotes = function (req, res) {
	Voting.find({"user": req.params.id})
		.sort({tasting_order_no: 'asc'})
		.populate("beer", ["name", "brewery"])
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

exports.vote_update = function (req, res) {
	let voteData = {
		beer: req.body.beer,
		rating: req.body.rating
	};

	Voting.findByIdAndUpdate(req.params.id, voteData, { new: true })
		.then(vote => {
			if(!vote) {
				return res.status(404).send({
					message: "Vote not found with id " + req.params.id
				});
			}
			
			res.send(vote);
		})
		.catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Vote not found with id " + req.params.id
				});                
			}
			
			return res.status(500).send({
				message: "Error updating vote with id " + req.params.id
			});
		});
};