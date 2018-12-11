import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Fingerprint2 from 'fingerprintjs2';

import './App.css';

import Home from './pages/Home';
import List from './pages/List';
import Auth from './pages/Auth';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {result: null};
	}

	componentWillMount()
	{
		const stuff = this;

		const getmefingerprint2 = async () => {
			const secure = await (new Promise(resolve => {
				new Fingerprint2().get((result, components) => resolve(result) );
			}));
			
			// do things with secure, whatever you return is thenable
			return secure;
		};

		getmefingerprint2().then(result => {
			console.log("WIN: " + result)
			stuff.setState({fpsignature: result});
		})

		// let promise = new Promise(function(resolve, reject) {
		// 	new Fingerprint2().get(resolve);
		// 	console.log("MOMOMOO");
		// });

		// promise.then((result) => {
		// 	console.log("WIN");
		// 	stuff.setState({fpsignature: result});
		// });
	}

	render() {
		console.log("DUNDER Å BRAK");

		const {fpsignature} = this.state;

		if(!fpsignature) {
			return <div/>;
		}

		const App = () => (
			<div>
				<h3> {fpsignature} </h3>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/list' component={List} />
					<Route path='/auth' component={() => <Auth fingerprint={fpsignature} />} />
				</Switch>
			</div>
		);

		return (
			<Switch>
				<App />
			</Switch>
		);
	}
}

export default App;