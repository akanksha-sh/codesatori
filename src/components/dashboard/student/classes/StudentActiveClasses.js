import React, { Component } from 'react'
import ClassItem from './StudentClassItem'

export class StudentActiveClasses extends Component {
	render() {
		return this.props.classes.map((classItem) => (<ClassItem key = {classItem.id} item={classItem}/>));
	}
}

export default StudentActiveClasses