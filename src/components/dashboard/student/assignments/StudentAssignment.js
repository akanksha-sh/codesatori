import React, { Component } from 'react'
import uuid from 'uuid'
import OngoingTutorials from './StudentOngoingTutorials'
import CompletedTutorials from './StudentCompletedTutorials'

export class StudentAssignment extends Component {

  state={
    ongoing: [],
    completed: []
  }

  componentDidMount() {
    this.setState({
      ongoing: [...DummyTutorialValues.tutorials.filter((tutorial)=>tutorial.ongoing)],
      completed: [...DummyTutorialValues.tutorials.filter((tutorial)=>!tutorial.ongoing)]
    })
  }

  render() {
      return (
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
          <div style={OngoingTutorialsStyle}>
            <h3>Ongoing</h3>
            <OngoingTutorials tutorials={this.state.ongoing} />
          </div>
          <div style={CompletedTutorialsStyle}>
            <h3>Completed</h3>
            <CompletedTutorials tutorials={this.state.completed} />
          </div>
        </div>
      )
  }
}

const OngoingTutorialsStyle={
  flex:'1',
  paddingRight:'5%',
  borderRight:'#000 solid 1pt',
}

const CompletedTutorialsStyle={
  flex:'1',
  paddingLeft:'5%',
}

export default StudentAssignment

/* Temporary values before hooking up the database */
const DummyTutorialValues = {
	tutorials: [
		{
			id: uuid.v4(),
			name: 'Tutorial 2',
			ongoing: true,
      tardy: '-',
			testsPassed: '-',
			totalTests: 2,
			score: '-',
      totalScore: 20,
      daysLeft:'2',
      classId: 0,
      className: "Mr William's class",
		},
		{
			id: uuid.v4(),
			name: 'Tutorial 1',
			ongoing: false,
			tardy: false,
			testsPassed: 2,
			totalTests: 2,
			score: '-',
			totalScore: 20,
      daysLeft:'-',
      classId: 0,
      className: "Mr William's class",
		},
		{
			id: uuid.v4(),
			name: 'Tutorial 0',
			ongoing: false,
			tardy: true,
			testsPassed: 1,
			totalTests: 1,
			score: 10,
			totalScore: 10,
      daysLeft:'-',
      classId: 0,
      className: "Mr William's class",
		}
	]
};
