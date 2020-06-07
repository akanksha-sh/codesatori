import React, { Component } from 'react'
import uuid from 'uuid'
import { ListGroup } from 'reactstrap'
import OngoingListItem from './StudentOngoingTutorialInformation'
import CompletedListItem from './StudentCompletedTutorialInformation'
import { pageTitle, contentDiv } from "../../../../Style"

export class StudentAssignments extends Component {

  state={
    tutorials: [],
  }

  componentDidMount() {
    this.setState({
      tutorials: [...DummyTutorialValues.tutorials],
    })
  }

  render() {
      return (
        <div style={contentDiv}>
          <h2 style={pageTitle}>Assignments</h2>
          <h4>Ongoing</h4>
          <div style={ClassGroupStyle}>
            <ListGroup style={ListStyle}>
              {this.state.tutorials.map(function (d, idx) {
              if (d.ongoing) {
                return <OngoingListItem key={idx} tutorial={d} />;
              }
              })}
            </ListGroup>
          </div>
          <h4>Completed</h4>
          <div style={ClassGroupStyle}>
            <ListGroup style={ListStyle}>
              {this.state.tutorials.map(function (d, idx) {
                if (!d.ongoing) {
                  return <CompletedListItem key={idx} tutorial={d} />;
                }
              })}
            </ListGroup>
          </div>
				</div>
      )
  }
}

const ClassGroupStyle={
	marginTop:'30px',
}

const ListStyle={
	marginTop:'20px',
  marginBottom:'20px',
  alignItems: 'center',
}

export default StudentAssignments

/* Temporary values before hooking up the database */
const DummyTutorialValues = {
	tutorials: [
		{
			id: uuid.v4(),
			name: 'Tutorial 2 : Linked-Lists',
			ongoing: true,
      tardy: '-',
			testsPassed: '-',
			totalTests: 2,
			score: '',
      totalScore: 20,
      daysLeft:'2',
      classId: 0,
      className: "Mr William's class",
		},
		{
			id: uuid.v4(),
			name: 'Tutorial 1 : Arrays',
			ongoing: false,
			tardy: false,
			testsPassed: 2,
			totalTests: 2,
			score: '',
			totalScore: 20,
      daysLeft:'-',
      classId: 0,
      className: "Mr William's class",
		},
		{
			id: uuid.v4(),
			name: 'Tutorial 0 : Programming in Python',
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
