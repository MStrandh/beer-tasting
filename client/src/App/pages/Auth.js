import React, { Component } from 'react';
import axios from 'axios';

class FingerPrintComponent extends Component {

	constructor(props){
		super(props);

		this.state = {result: null};
	}

	async componentWillMount()
	{
		const stuff = this;

		await axios.get("/users/" + this.props.fingerprint + "/fp")
		.then(res => {
			stuff.setState({ userData: res.data.name });
		}).catch(res => {
			console.log(res);
		});
	}

	render()
	{
		const {userData} = this.state;

		return(
			<div style={{'textAlign':'center'}}>
				<br/>
				<br/>
				<span> Device FingerPrint </span>
				<hr />
				<h2> {userData} </h2>
			</div>);
	}
}

export default FingerPrintComponent;