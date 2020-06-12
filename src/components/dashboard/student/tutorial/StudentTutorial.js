import React, { Component } from "react"
import Countdown from "./Countdown"
import { Collapse, ListGroup } from "reactstrap"
import moment from 'moment'
import { pageTitle, contentDiv, listGroup } from "../../../../Style"
import TutorialListItem from './TutorialListItem';

export class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "(Tutorial Name)",
      questions: [],
    };
  }

  
  componentDidMount() {
    this.getTutorialQuestions()
  }

  getTutorialQuestions = () => {
    //access database
    console.log("This tutorial's id is: " + this.state.id)
    if (this.state.id === 'fc5d4ff6-7300-4765-a629-280afa06d01b') {
      const question1 = "Write a public method with signature 'createIntList()' that will return an empty LinkedList of type 'Integer'."

      this.setState({
        name: 'Java Homework 2 : Linked-List', 
        questions:[{
          id:1, 
          questionText:question1,
          studentAnswer:""
        }]
      })
    } else if (this.state.id === 'd57b350e-b599-48a5-9c05-9c1147869267') {
      this.setState({
        name: 'Java Homework 1 : Arrays',
        questions:[{
          id:1, 
          questionText:"Write a public method with sigature 'max(int[] is)' that returns the largest integer in the array.",
          studentAnswer:" "
        }]
      })
    } else if (this.state.id === '08c56c8b-a940-4e20-ae9a-d4c6bdb1a5c8') {
      this.setState({
        name: 'Java Introduction : Programming in Python',
        questions:[{
          id:1, 
          questionText:"Write a static public method with signature 'hello()' that prints 'Hello World' to console.",
          studentAnswer:'public static void hello() { printf("Hello World");  }'
        }]
      })
    }
  }

  getCountdownBoxStyle = (isOverdue) => {
    return ({
      display: 'flex',
      padding: '8px',
      border: '1px solid #ccc',
      minWidth:'200pt',
      background: (isOverdue) ? '#f2f2f2' : '#b73e3a',
      color: (isOverdue) ? '#000' : '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    })
  }

  getCountdownBox = (deadline) => {
    const isOverdue = moment().diff(moment(deadline)) > 0
    const countdownBoxStyle = this.getCountdownBoxStyle(isOverdue)

    if (isOverdue) {
      return (
        <div style={countdownBoxStyle}>This tutorial has been locked.</div>
      )
    } else {
      return (
        <Countdown deadline={deadline} countdownBoxStyle={countdownBoxStyle}/>
      )
    }
  }


	getBtnStyle = (isSave) => {
		return ({
      background: (isSave) ? '#f2f2f2' : '#e0e0e0',
			color: '#000',
			border: 'none',
			height: '30px',
			width: '100px',
			cursor: 'pointer',
      fontSize: '6pt',
      margin: '5pt',
			})
  }

  getButtons = (submitted) => {
    if (!submitted) {
      return (
        <div style={BtnGroupStyle}>
          <button 
            style={this.getBtnStyle(false)} 
            onClick={this.submit}
            onMouseEnter={(e) => e.target.style.background= "#f2f2f2"}
            onMouseLeave={(e) => e.target.style.background= "#e0e0e0"}
            >
            Submit
          </button>
          <button 
            style={this.getBtnStyle(true)} 
            onMouseEnter={(e) => e.target.style.background= "#e0e0e0"}
            onMouseLeave={(e) => e.target.style.background= "#f2f2f2"}
            onClick={this.save}
            > 
            Save
          </button>
          <button 
            style={this.getBtnStyle(false)} 
            onMouseEnter={(e) => e.target.style.background= "#f2f2f2"}
            onMouseLeave={(e) => e.target.style.background= "#e0e0e0"}
            onClick={this.saveAndExit}
            > 
            Save and Exit
          </button>
        </div>
      )
    } 

    return (
      <div style={BtnGroupStyle}>
        <button 
            style={this.getBtnStyle(false)} 
            onMouseEnter={(e) => e.target.style.background= "#f2f2f2"}
            onMouseLeave={(e) => e.target.style.background= "#e0e0e0"}
            onClick={this.exit}
            > 
            Exit
          </button>
      </div>
    )
  }

  submit = () => {
    //save to database and change status to submit
  }

  save = () => {
    //save to database
  }
  
  saveAndExit = () => {
    //save to database
    this.props.history.goBack()
  }

  exit = () => {
    this.props.history.goBack()
  }

  render() {
    const { deadline, submitted } = this.props.location.state
    
    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}>{this.state.name}</h2>
        <Collapse isOpen={moment().diff(moment(deadline)) > 0} style={TimeLeftStyle}>
          <div style={{margin:'8px'}}>
            Time left: 
          </div>
          {this.getCountdownBox(deadline)}
        </ Collapse>
        <ListGroup style={listGroup}>
          {this.state.questions.map((q) => {
              return <TutorialListItem key={q.id} question={q} />;
            }
          )}              
        </ListGroup>
        {this.getButtons(submitted)}
      </div>
    );
  }
}

export default Tutorial;

const TimeLeftStyle = {
  display: 'flex',
  flexDirection: 'row',
  width:'30%',
  minWidth:'250pt',
  marginLeft:'auto',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize:'12px',
}

const BtnGroupStyle = {
  display:'flex', 
  flexDirection: 'column',
  alignItems:'center', 
  justifyContent:'center',
  marginTop: '50px',
}