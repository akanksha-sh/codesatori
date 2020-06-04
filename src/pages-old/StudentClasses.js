import React, { Component } from 'react'
import ClassItem from './StudentClassItem'

export class StudentClasses extends Component {
	render() {
		return this.props.classes.map((classItem) => (<ClassItem key = {classItem.id} item={classItem}/>));
	}
}

export default StudentClasses