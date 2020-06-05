import React, { Component} from 'react'
import { Collapse, Table } from 'reactstrap'
import StudentClassInfo from './StudentClassInfo'

export class StudentClassListItem extends Component {
	state={
		isOpen: false,
	}

	getBtnStyle = () => {
		return {
			background: (!this.state.isOpen) ? '#b73e3a' : '#e5e5e5',
			color: (!this.state.isOpen) ? '#ffffff' : '#000000',
			height: '15pt',
			width: '15pt',
			border: 'none',
			cursor: 'pointer',
			fontSize: '10pt',
			fontWeight: (!this.state.isOpen) ? 'normal' : 'bold',
		}
	}

	getDescriptionStyle = (status) => {
		return {
			background: (status === 'pending') ? "#f2f2f2" : "#ffffff",
			color: (status === 'pending') ? '#8e929b' : "#000000",
			display: "flex",
			alignItems: "top",
			borderBottom: "1px #ccc solid",
			padding: "20px 20px 1px",
			height: "80pt",
			width: "100%",
			fontWeight: 'bold',
		}
	}

	toggleNav = () => this.setState({
		isOpen: !this.state.isOpen,
	});

	render() {
		return (
			<div>
				<div style={this.getDescriptionStyle(this.props.class.status)}>
					{this.props.class.name}
					<Collapse isOpen={this.props.class.status !== 'pending'} style={{marginLeft:'auto'}}>
						<button onClick={this.toggleNav} style={this.getBtnStyle()}>
							{(this.state.isOpen) ? '-' : '+'}
						</button>
					</Collapse>
				</div>
				<Collapse isOpen={this.state.isOpen}>
					<Table responsive="sm" style={{display:'flex', flexDirection:'column', width:'100%'}} hover>
						<thead>
						<tr>
							<th>Title</th>
							<th>Status</th>
							<th>On Time/Late</th>
							<th>No. Of Tests Passed</th>
							<th>Score</th>
						</tr>
						</thead>
						<tbody>
							<StudentClassInfo id={this.props.class.id} />
						</tbody>
					</Table>
				</Collapse>
			</div>
		)
	}
}

export default StudentClassListItem
