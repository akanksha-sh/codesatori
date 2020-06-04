import React, { Component } from 'react'
import uuid from 'uuid'
import ActiveClasses from './StudentActiveClasses';

export class StudentClasses extends Component {

	state={
		activeClasses: [],
		inactiveClasses: []
	};

	componentDidMount() {
		this.setState({activeClasses: DummyClassValues.classes})
	}

	render() {
		console.log(this.state)
		return (
			<div style={{margin:'1%'}}>
				<h3>Active Classes</h3>
				<div style={{width:'70%', marginTop:'3%', marginLeft:'1%'}}>
					<ActiveClasses classes={this.state.activeClasses}/>
				</div>
			</div>
		)
	}
}

// Temporary values before hooking up the database
const DummyClassValues={
	classes: [
		{
			id: uuid.v4(),
			name: "Mr William's class",
			overdue: 0,
			tasks: 1,
			completed: 1,
			marked: 1,
		},
	],
};

export default StudentClasses
