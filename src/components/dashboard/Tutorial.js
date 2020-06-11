import React, { Component } from "react"
import Countdown from "./Countdown"
import { Collapse } from "reactstrap"
import moment from 'moment'
import { pageTitle, contentDiv } from "../../Style"

export class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.saveAndExit = this.saveAndExit.bind(this);
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
        <div style={countdownBoxStyle}>Deadline has passed.</div>
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
      hoverColor: (!isSave) ? '#fff' : '#e0e0e0',
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
    const { id } = this.props.match.params
    const { deadline, submitted } = this.props.location.state
    
    return (
      <div style={contentDiv}>
        <h2 style={pageTitle}>(Tutorial Name)</h2>
        <Collapse isOpen={moment().diff(moment(deadline)) > 0} style={TimeLeftStyle}>
          <div style={{margin:'8px'}}>
            Time left: 
          </div>
          {this.getCountdownBox(deadline)}
        </ Collapse>
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