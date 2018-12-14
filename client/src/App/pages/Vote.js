import React, { Component } from 'react';

class Vote extends Component {
	constructor(props){
		super(props);

		this.state = {
			list: [],
			currentTasting: "5c142b5c758ea7ea4d5bdd0d",
			currentUser: "5c0fa5a69e7375fba6870888",
			currentBeer: 1
		}
	}

	// Fetch the list on first mount
	async componentDidMount() {
		await this.getList();
		await this.getCurrentBeer();
	}

	getList = () => {
		fetch('/api/beers/all')
		.then(res => res.json())
		.then(list => this.setState({ list }))
	}

	getCurrentBeer = () => {
		fetch('/api/tastings/5c142b5c758ea7ea4d5bdd0d/currentBeer')
		.then(res => res.json())
		.then(currentBeer => this.setState({ currentBeer }))
	}

	handleSubmit(e) {
       	e.preventDefault();
        console.log(this.state.currentTasting);
        console.log(this.state.currentUser);

		fetch("/api/votings/user/cast", {
			method: 'POST',
			body:{
				tasting: this.state.currentTasting,
				user: this.state.currentUser,
				tasting_order_no: this.state.currentBeer,
				beer: this.refs.vote_beer.value,
				rating: this.refs.vote_rating.value
			}
		})
		.then(function(response){
			console.log(response);
			return response.json();
		});
    }

	render() {
		const { list, currentBeer } = this.state;

		return (
			<div className="App">
				<div><h1>#{currentBeer}</h1></div>
				<form name="post_vote" onSubmit={this.handleSubmit.bind(this)}>
					{list.length ? (
							<div>
								Öl:
								<select ref="vote_beer">
									{list.map(item => {
										return (<option key={item._id} value={item._id}>{item.name}</option>);
									})}
								</select>
							</div>
						) : (
							<div>---</div>
						)
					}
					Betyg:
					<select ref="vote_rating">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<button type="submit" id="post_vote_submit">
	                    Skicka
	                </button>
				</form>
			</div>
		);
	}
}
export default Vote;