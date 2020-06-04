import React, { Component } from "react";
import { Link } from "react-router-dom";

export class StudentOngoingTutorialInformation extends Component {
    
    getCountdownBoxStyle = (daysLeft) => {
        return ({
            display:'flex',
            background: (daysLeft > 0) ? '#000' : '#b73e3a',
            flex:'3',
            color:'#fff',
            fontSize:'8pt',
            textAlign:'center',
            lineHeight:'10pt',
            alignItems:'center',
            justifyContent:'center',
        })
    }
    
    render() {
        return (
            <Link to="/tutorial">
                <div style={InfoBoxStyle}>
                        <div style={this.getCountdownBoxStyle(this.props.tutorial.daysLeft)}>
                            {this.props.tutorial.daysLeft} Days Left
                        </div>
                        <div style={NameBoxStyle}>
                            {this.props.tutorial.name}
                        </div>
                </div>
            </Link>
        )
    }
}

export default StudentOngoingTutorialInformation

const InfoBoxStyle ={
    display:'flex',
    width:'100%',
    height:'35pt',
    flexDirection:'row',
}

const NameBoxStyle={
    display:'flex',
    background:'#f2f2f2',
    flex:'10',
    color:'#000',
    fontSize:'8pt',
    paddingLeft:'5pt',
    lineHeight:'10pt',
    alignItems:'center',
    justifyContent:'left',
}