import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Route, Switch } from 'react-router-dom';
import Fingerprint2 from 'fingerprintjs2';

class App extends Component {

	constructor() {
		super();

		this.state = {
			response: false,
			endpoint: "http://localhost:5000"
		};
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = socketIOClient(endpoint);

		socket.on("CurrentBeer", data => this.setState({ response: data }));
	}

	render() {
		const { response } = this.state;

		var output = <p>Loading...</p>;

		if(this.state) {
			output = <p>Öl #{response}</p>
		}

		return (
			<div style={{ textAlign: "center" }}>
				{output}
			</div>
		);
	}
}

export default App;