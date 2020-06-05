import React, { Component } from 'react'
import uuid from 'uuid'
import ActiveClasses from './StudentActiveClasses';
import InactiveClasses from './StudentInactiveClasses';
import { Collapse } from 'reactstrap';

export class StudentClasses extends Component {

	state={
		activeClasses: [],
		inactiveClasses: [],
		inactiveShown: false,
	};

	getBtnStyle = () => {
		return ({
			background: (!this.state.inactiveShown) ? '#b73e3a' : '#e5e5e5',
			color: (!this.state.inactiveShown) ? '#ffffff' : '#000000',
			border: 'none',
			height: '20px',
			width: '30px',
			borderRadius: '10%',
			cursor: 'pointer',
			float: 'left',
			fontSize: '6pt',
			})
	}

	componentDidMount() {
		this.setState({activeClasses: DummyClassValues.classes})
	}

	toggleShow = () => this.setState({
		inactiveShown: !this.state.inactiveShown
	});

	render() {
		return (
			<div>
				<div>
					<h3>Active Classes</h3>
					<div style={ClassesStyle}>
						<ActiveClasses classes={this.state.activeClasses}/>
					</div>
				</div>
				<div style={{marginTop:'30px'}}>
					<div style={{display:'flex', flexDirection:'column', alignItems:'left', alignContent:'center'}}>
						<h3>Inactive Classes</h3>
						<button style={this.getBtnStyle()} onClick={this.toggleShow}> 
							{(this.state.inactiveShown) ? 'hide' : 'show' }
						</button>
					</div>
					<div  style={ClassesStyle}>
						<Collapse isOpen={this.state.inactiveShown}>
							<InactiveClasses classes={this.state.inactiveClasses}/>
						</Collapse>
					</div>
				</div>
			</div>
		)
	}
}

const ClassesStyle={
	width:'80%', 
	marginTop:'3%', 
	marginLeft:'1%',
}

// Temporary values before hooking up the database
const DummyClassValues={
	classes: [
		{
			id: uuid.v4(),
			name: "Mr William's class",
			overdue: 0,
			tasks: 1,
			completed: 1,
			marked: 1,
		},
	],
};

export default StudentClasses
