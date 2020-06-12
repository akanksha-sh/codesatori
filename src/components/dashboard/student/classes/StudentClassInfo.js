import React, { Component } from "react";
import uuid from "uuid";
import TutorialInfo from "./StudentTutorialInfo";

export class StudentClassInfo extends Component {
  state = {
    id: 0,
    tutorials: [],
  };

  componentDidMount() {
    this.setState({
      id: this.props.id,
      tutorials: DummyClassTutorials.tutorials,
    });
  }

  render() {
    return this.state.tutorials.map((tutorial) => (
      <TutorialInfo key={tutorial.id} tutorial={tutorial} />
    ));
  }
}

export default StudentClassInfo;

/* Temporary values before hooking up the database */
const DummyClassTutorials = {
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
  ],
};
