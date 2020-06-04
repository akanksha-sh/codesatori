import React, { Component } from 'react'
import NavigationBar from './NavigationBar'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Classes from './Classes';
import Assignments from './Assignments'

export class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Router>
					<NavigationBar />
					<div style={{"paddingTop": "65px"}}>
						<Route exact path="/classes" component={Classes} />
						<Route exact path="/assignments" component={Assignments} />
						<Redirect exact from="/" to="/classes" />
					</div>
				</Router>
			</div>
		)
	}
}

export default Dashboard
