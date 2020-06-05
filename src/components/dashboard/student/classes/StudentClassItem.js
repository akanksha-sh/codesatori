import React, { Component} from 'react'
import { Collapse, Table } from 'reactstrap'
import StudentClassInfo from './StudentClassInfo'

export class StudentClassItem extends Component {
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
			borderRadius: '50%',
			cursor: 'pointer',
			float: 'right',
			fontSize: '10pt',
			fontWeight: (!this.state.isOpen) ? 'normal' : 'bold',
		}
	}

	toggleNav = () => this.setState({
		isOpen: !this.state.isOpen,
	});

	render() {
		return (
			<div>
				<div style={DescriptionStyle}>
					{this.props.item.name}
					<button onClick={this.toggleNav} style={this.getBtnStyle()}>
						{(this.state.isOpen) ? '-' : '+'}
					</button>
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
							<StudentClassInfo id={this.props.item.id} />
						</tbody>
					</Table>
				</Collapse>
			</div>
		)
	}
}

export default StudentClassItem

const DescriptionStyle = {
	background: "#ffffff",
	alignItems: "center",
	borderBottom: "1px #ccc solid",
	padding: "4px 6px 1px",
	width: "100%",
	fontWeight: 'bold',
}