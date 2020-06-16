import React, { Component } from "react";
import { ListGroup, Spinner } from "reactstrap";
import OngoingListItem from "./StudentOngoingTutorialInformation";
import CompletedListItem from "./StudentCompletedTutorialInformation";
import { pageTitle, contentDiv } from "../../../../Style";
import * as Globals from "./../../../../Globals"
import axios from "axios"
import AuthUserContext from '../../../../session/Context'

export class StudentAssignments extends Component {
  static contextType = AuthUserContext

  state = {
    tutorials: [],
    assignmentDatas: [],
    error: null,
    isLoading: true,
  };

  componentDidMount() {
    this.getAssignments();
  }

  getAssignments = () => {
    console.log("Retrieving user's assignments from: " + Globals.BACKEND_URL)
		const userContext = this.context
		userContext.authUser.getIdToken().then(async (idToken) => {
			const asgnRet = await axios({
				url: Globals.BACKEND_URL + "assignments/student",
				method: "GET",
				headers: {
					Authorization: "Bearer " + idToken,
				},
			});
			console.log("getAssignment(): " + JSON.stringify(asgnRet.data));
			this.setState({ assignmentDatas: asgnRet.data, isLoading: false });
			}).catch((errorRet) => {
				console.log("Error from backend: ", errorRet);
				this.setState({ error: errorRet });
        		this.setState({ isLoading: false });
			});
  }

  getAssignmentStatus = (assignmentData) => {
    return assignmentData.assignment.assignmentStatus.filter((status) => {
      if (status.classId === assignmentData.studentSubmission.classId) {
        return status
      }
    })[0]
  }

  hasBeenSubmitted = (assignmentData) => {
    return assignmentData['studentSubmission']['submissionDate'] !== null
  }

  render() {
    let ongoingAssignmentDatas = this.state.assignmentDatas.filter((assignmentData) => {
      const assignmentStatus = this.getAssignmentStatus(assignmentData)
      if (assignmentStatus.status === 0 && !this.hasBeenSubmitted(assignmentData)) {
        return assignmentData
      }
    })

    let completedAssignmentDatas = this.state.assignmentDatas.filter((assignmentData) => {
      const assignmentStatus = this.getAssignmentStatus(assignmentData)
      if (assignmentStatus.status === 1 || this.hasBeenSubmitted(assignmentData)) {
        return assignmentData
      }
    })

    console.log("Ongoing tutorials are: " + JSON.stringify(ongoingAssignmentDatas))
    console.log("Completed tutorials are: " + JSON.stringify(completedAssignmentDatas))

    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}>Assignments</h2>
        { this.state.isLoading ? 
          <div className="text-center">
            <Spinner color="dark" className="mb-2" />
          </div> :
          <div>
            <h4>Ongoing</h4>
            <div style={ClassGroupStyle}>
              <ListGroup style={ListStyle}>
                {ongoingAssignmentDatas.map(function (assignmentData, idx) {
                  return <OngoingListItem key={assignmentData.assignment.assignmentId} tutorial={assignmentData}/>;
                })}
              </ListGroup>
            </div>
            <h4>Completed</h4>
            <div style={ClassGroupStyle}>
              <ListGroup style={ListStyle}>
                {completedAssignmentDatas.map(function (assignmentData, idx) {
                  return <CompletedListItem key={assignmentData.assignment.assignmentId} tutorial={assignmentData} />;
                })}
              </ListGroup>
            </div>
          </div>
        }
      </div>
    );
  }
}

const ClassGroupStyle = {
  marginTop: "30px",
};

const ListStyle = {
  marginTop: "20px",
  marginBottom: "20px",
  alignItems: "center",
};

export default StudentAssignments;

/* Temporary values before hooking up the database */
const DummyTutorialValues = {
  tutorials: [
    {
      id: "fc5d4ff6-7300-4765-a629-280afa06d01b",
      name: "Java Homework 2 : Linked-List",
      ongoing: true,
      testsPassed: "",
      totalTests: 2,
      score: "",
      totalScore: 20,
      submissionDate: "",
      deadline: "2020-07-01 00:00:00+00",
      classId: 0,
      className: "Mr Richard Xiong's class",
    },
    {
      id: "d57b350e-b599-48a5-9c05-9c1147869267",
      name: "Java Homework 1 : Arrays",
      ongoing: false,
      testsPassed: 0,
      totalTests: 2,
      score: "",
      totalScore: 20,
      submissionDate: "2019-12-31 00:00:00+00",
      deadline: "2020-01-01 00:00:00+00",
      classId: 0,
      className: "Mr Richard Xiong's class",
    },
    {
      id: "08c56c8b-a940-4e20-ae9a-d4c6bdb1a5c8",
      name: "Java Introduction : Programming in Java",
      ongoing: false,
      testsPassed: 1,
      totalTests: 1,
      score: 10,
      totalScore: 10,
      submissionDate: "2020-01-01 12:00:00+00",
      deadline: "2020-01-01 00:00:00+00",
      classId: 0,
      className: "Mr Richard Xiong's class",
    },
  ],
};
