import React, { Component } from 'react'
import { ListGroup } from 'reactstrap'
import uuid from 'uuid'
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
      id: 'fc5d4ff6-7300-4765-a629-280afa06d01b',
			name: 'Tutorial 2 : Linked-Lists',
			ongoing: true,
			testsPassed: '',
			totalTests: 2,
			score: '',
      totalScore: 20,
      submissionDate: '',
      deadline:'2020-07-01 00:00:00+00',
      classId: 0,
      className: "Mr Richard Xiong's class",
		},
		{
			id: 'd57b350e-b599-48a5-9c05-9c1147869267',
			name: 'Tutorial 1 : Arrays',
			ongoing: false,
			testsPassed: 2,
			totalTests: 2,
			score: '',
			totalScore: 20,
      submissionDate: '2019-12-31 00:00:00+00',
      deadline:'2020-01-01 00:00:00+00',
      classId: 0,
      className: "Mr Richard Xiong's class",
    },
    {
      id: '08c56c8b-a940-4e20-ae9a-d4c6bdb1a5c8',
			name: 'Tutorial 0 : Programming in Python',
			ongoing: false,
			testsPassed: 1,
			totalTests: 1,
			score: 10,
			totalScore: 10,
      submissionDate: '2020-01-01 12:00:00+00',
      deadline:'2020-01-01 00:00:00+00',
      classId: 0,
      className: "Mr Richard Xiong's class",
    },
	]
};
