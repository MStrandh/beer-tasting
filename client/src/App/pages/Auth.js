import React, { Component } from 'react';
import Fingerprint2 from 'fingerprintjs2';
import axios from 'axios';

class FingerPrintComponent extends Component {

	constructor(props){
		super(props);

		this.state = {result: null};
	}

	async componentWillMount()
	{
		const stuff = this;

		new Promise(function(resolve, reject) {
			new Fingerprint2().get(resolve);

		}).then((result) => {
			stuff.setState({fpsignature: result});

			axios.get("/users/" + result + "/fp")
			.then(res => {
				console.log(res.data);

				stuff.setState({ userData: res.data.name });
			});

		});

		// var fingerprint = new Promise(function(resolve, reject) {
		// 	try {
		// 		new Fingerprint2().get(resolve);
		// 	} catch (e) {
		// 		reject(e);
		// 	}
		// });

		// fingerprint.then(fp => {
		// 	stuff.setState({fpsignature: fp});

		// 	axios.get("/users/" + fp + "/fp")
		// 	.then(res => {
		// 		console.log(res.data);

		// 		const user = res.data;
		// 		stuff.setState({ userData: user });
		// 	});
		// });

		// fpInstance.get(result => {
		// 	console.log("FIS");

		// 	stuff.setState({fpsignature: result});
		// });

		// console.log("PRUTT");

		// await axios.get(`/users/3373dabc7ae770ce8eca4cc00086f8a1/fp`)
		// .then(res => {
		// 	const user = res.data;
		// 	this.setState({ userData: user });
		// });
	}

	render()
	{
		const {fpsignature} = this.state;

		console.log("Render: " + this.state.userData);

		if( !fpsignature ) {
			return (<div> waiting ...  </div>);
		}

		return(
			<div style={{'textAlign':'center'}}>
				<br/>
				<br/>
				<span> Device FingerPrint </span>
				<hr />
				<h1> {fpsignature} </h1>
				<h2> {this.state.userData} </h2>
			</div>);
	}
}

export default FingerPrintComponent;