import React from 'react';
import Fingerprint2 from 'fingerprintjs2';

const fpInstance = new Fingerprint2();

class FingerPrintComponent extends React.Component {

	constructor(){
		super();
		this.state = {result: null};
	}

	componentWillMount()
	{
		const stuff = this;

		fpInstance.get((result) => {
				stuff.setState({fpsignature: result});
		});
	}

	render()
	{
		const {fpsignature} = this.state;

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
			</div>);
	}
}

export default FingerPrintComponent;