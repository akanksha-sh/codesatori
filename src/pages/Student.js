import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentAssignment from "./StudentAssignment"

export class Student extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/assignment" component={StudentAssignment} />
				<Route exact path="/" render={(props) => (
						<div className="">
						</div>
					)}
				/> 
			</Router>
		)
	}
}

export default Student
