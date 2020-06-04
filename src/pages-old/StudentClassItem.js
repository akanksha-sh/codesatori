import React, { Component} from 'react'
import { Collapse } from 'reactstrap'
import StudentClassInfo from './StudentClassInfo'

export class StudentClassItem extends Component {
	state={
		isOpen: false,
		btnSymbol: '+',
	}

	getTutorials = (e) => {
		return (
			[
				'Hello'
			]
		)
	}

	getDescriptionStyle = () => {
		return {
			background: (this.props.item.overdue === 0) ? "#ffffff" : "#b73e3a",
			alignItems: "center",
			borderBottom: "1px #ccc solid",
			padding: "4px 6px 1px",
			width: "100%",
			fontWeight: 'bold',
		}
	}

	getBtnStyle = () => {
		if (this.state.btnSymbol === '+') {
			return {
				background: '#b73e3a',
				color: '#ffffff',
				border: 'none',
				padding: '0px 6px',
				borderRadius: '50%',
				cursor: 'pointer',
				float: 'right',
				fontSize: '10pt',
			}
		} else {
			return {
				background: '#e5e5e5',
				color: '#000000',
				border: 'none',
				padding: '0px 8px',
				borderRadius: '50%',
				cursor: 'pointer',
				float: 'right',
				fontSize: '10pt',
			}
		}
	}

	toggleNav = () => this.setState({
		isOpen: !this.state.isOpen, 
		btnSymbol: (this.state.btnSymbol === '+') ? '-' : '+'
	});

	render() {
		return (
			<div>
				<div style={this.getDescriptionStyle()}>
					{this.props.item.name}
					<button onClick={this.toggleNav} style={this.getBtnStyle()}>{this.state.btnSymbol}</button>
				</div>
				<Collapse isOpen={this.state.isOpen}>
					<StudentClassInfo id={this.props.item.id} />
				</Collapse>
			</div>
		)
	}
}

export default StudentClassItem