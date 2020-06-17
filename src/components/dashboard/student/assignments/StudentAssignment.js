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

