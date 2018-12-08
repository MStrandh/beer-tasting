const User = require('../models/user.model');

exports.user_create = function (req, res) {

	if(!req.body.name) {
		return res.status(400).send({
			message: "Create user failed. Name can not be empty."
		});
	}

	let user = new User(
		{
			name: req.body.name,
			fingerprint: req.body.fingerprint
		}
	);

	user.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
			message: err.message || "Some error occurred while creating User."
		});
	});
};

exports.user_details = function (req, res) {
	User.findById(req.params.id)
		.then(user => {
			if(!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});            
			}

			res.send(user);
		})
		.catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});                
			}

			return res.status(500).send({
				message: "Error retrieving user with id " + req.params.id
			});
		});
};

exports.user_fingerprint = function (req, res) {
	User.findOne({"fingerprint": req.params.fingerprint}, 'name')
		.then(user => {
			if(!user) {
				return res.status(404).send({
					message: "User with fingerprint not found  " + req.params.fingerprint
				});            
			}

			res.send(user);
		})
		.catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});                
			}

			return res.status(500).send({
				message: "Error retrieving user with id " + req.params.id
			});
		});
};

exports.user_update = function (req, res) {
	// Validate Request
	if(!req.body.name) {
		return res.status(400).send({
			message: "User name can not be empty"
		});
	}

	let userData = {
		name: req.body.name,
		fingerprint: req.body.fingerprint
	};

	User.findByIdAndUpdate(req.params.id, userData, { new: true })
		.then(user => {
			if(!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
			
			res.send(user);
		})
		.catch(err => {
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});                
			}
			
			return res.status(500).send({
				message: "Error updating user with id " + req.params.id
			});
		});
};

exports.user_delete = function (req, res) {
	User.findByIdAndRemove(req.params.id)
		.then(user => {
			if(!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
			
			res.send({message: "User deleted successfully!"});
		})
		.catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});                
			}
			
			return res.status(500).send({
				message: "Could not delete user with id " + req.params.id
			});
		});
};
