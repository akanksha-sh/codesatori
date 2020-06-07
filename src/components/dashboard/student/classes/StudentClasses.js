import React, { Component } from 'react'
import { Collapse } from 'reactstrap'
import { ListGroup } from "reactstrap"
import uuid from 'uuid'
import AddClass from './StudentAddClass'
import ClassListItem from './StudentClassListItem'
import { pageTitle, contentDiv } from "../../../../Style";

export class StudentClasses extends Component {

	state={
		classes: [],
		inactiveShown: false,
	};

	addClass = (name) => {
		const newClass = {
			id: uuid.v4(),
			name: name,
			status: "pending",
			overdue: 0,
			tasks: 0,
			completed: 0,
			marked: 0,
		}
		this.setState({classes: [...this.state.classes, newClass]})
	}

	getBtnStyle = () => {
		return ({
			background: (!this.state.inactiveShown) ? '#000000' : '#e5e5e5',
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
		this.setState({classes: DummyClassValues.classes})
	}

	toggleShow = () => this.setState({
		inactiveShown: !this.state.inactiveShown
	});

	render() {
		var inactiveClasses=[...this.state.classes.filter((c)=>c.status==='inactive')]
		var pendingClasses=[...this.state.classes.filter((c)=>c.status==='pending')]
		return (
			<div style={contentDiv}>
				<h2 style={pageTitle}> Classes </h2>
        		<AddClass addClass={this.addClass}/>
				<div style={ClassGroupStyle}>
					<Collapse isOpen={pendingClasses.length > 0}>
						<h4>Pending</h4>
						<ListGroup style={ListStyle}>
							{pendingClasses.map((c)=><ClassListItem key={c.id} class={c}/>)}
						</ListGroup>
					</Collapse>
				</div>
				<div style={ClassGroupStyle}>
					<h4>Active Classes</h4>
					<ListGroup style={ListStyle}>
						{this.state.classes.map(function (d, idx) {
						if (d.status === 'active') {
							return <ClassListItem key={idx} class={d}/>;
						}
						})}
					</ListGroup>
				</div>
				<div style={ClassGroupStyle}>
					<h4>Inactive Classes</h4>
					<button style={this.getBtnStyle()} onClick={this.toggleShow}> 
						{(this.state.inactiveShown) ? 'hide' : 'show' }
					</button>
					<br />
					<Collapse isOpen={this.state.inactiveShown}>
						{(inactiveClasses.length === 0) ?
							<div style={{fontSize:'8pt'}}>Nothing to show</div> :
							<ListGroup style={ListStyle}>
								{inactiveClasses.map((c) => <ClassListItem key={c.id} class={c}/>)}
							</ListGroup>
						}
					</Collapse>
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
	padding:'0px',
}

// Temporary values before hooking up the database
const DummyClassValues={
	classes: [
		{
			id: uuid.v4(),
			name: "Mr William's class",
			status: "active",
			overdue: 0,
			tasks: 1,
			completed: 1,
			marked: 1,
		},
		{
			id: uuid.v4(),
			name: "Mrs William's class",
			status: "inactive",
			overdue: 0,
			tasks: 1,
			completed: 1,
			marked: 1,
		}
	],
};

export default StudentClasses
