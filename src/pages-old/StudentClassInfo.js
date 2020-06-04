import React, { Component} from 'react'
import uuid from 'uuid'
import TutorialInfo from './StudentTutorialInfo'

export class StudentClassInfo extends Component {
	state={
		id: 0,
		tutorials: []
	}

	componentDidMount () {
		this.setState({
			id: this.props.id,
			tutorials: DummyClassTutorials.tutorials,
		})
	}

	render () {
		return (
			this.state.tutorials.map((tutorial) => <TutorialInfo key={tutorial.id} tutorial={tutorial} />)
		)
	}
}

export default StudentClassInfo

/* Temporary values before hooking up the database */
const DummyClassTutorials = {
	tutorials: [
		{
			id: uuid.v4(),
			name: 'Tutorial 2',
			status: 'Not Submitted',
			tardy: '-',
			testsPassed: '-',
			totalTests: 2,
			score: '-',
			totalScore: 20,
		},
		{
			id: uuid.v4(),
			name: 'Tutorial 1',
			status: 'Submitted',
			tardy: false,
			testsPassed: 2,
			totalTests: 2,
			score: '-',
			totalScore: 20,
		},
		{
			id: uuid.v4(),
			name: 'Tutorial 0',
			status: 'Submitted',
			tardy: true,
			testsPassed: 1,
			totalTests: 1,
			score: 10,
			totalScore: 10,
		}
	]
};