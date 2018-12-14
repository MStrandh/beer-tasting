import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import BeerList from './pages/BeerList';
import Vote from './pages/Vote';

class App extends Component {
	constructor(props) 	{
		super(props);

		this.state = {result: null};
	}

	componentWillMount() {
	}

	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/beerlist' component={BeerList} />
					<Route path='/vote' component={Vote} />
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