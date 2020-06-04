import React, { Component} from 'react'

export class StudentTutorialInfo extends Component {
	render () {
		return (
			<div>{this.props.tutorial.name}</div>
		)
	}
}

export default StudentTutorialInfo