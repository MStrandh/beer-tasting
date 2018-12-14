import React, { Component } from 'react';

class BeerList extends Component {
	// Initialize the state
	constructor(props){
		super(props);
		this.state = {
			list: []
		}
	}

	// Fetch the list on first mount
	componentDidMount() {
		this.getList();
	}

	// Retrieves the list of items from the Express app
	getList = () => {
		fetch('/api/beers/all')
		.then(res => res.json())
		.then(list => this.setState({ list }))
	}

	render() {
		const { list } = this.state;

		return (
			<div className="App">
				<h1>Julölslistan - Number UNO!</h1>

				{list.length ? (
					<div>
						<table>
							<thead>
								<tr>
									<td>
										#
									</td>
									<td>
										<h3>Bryggeri</h3>
									</td>
									<td>
										<h3>Öl</h3>
									</td>
								</tr>
							</thead>
							<tbody>
								{list.map((item, i) => {
									return(
										<tr>
											<td>
												{i+1}
											</td>
											<td>
												{item.brewery}
											</td>
											<td>
												{item.name}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<div>
						<h2>No List Items Found</h2>
					</div>
				)
			}
			</div>
		);
	}
}

export default BeerList;