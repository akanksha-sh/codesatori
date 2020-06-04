import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import TeacherAssignment from '../../pages-old/TeacherAssignment'
import StudentAssignment from './student/StudentAssignment'

export class Assignments extends Component {
    static contextType = UserContext

    constructor(props) {
      super(props);
    }

    render() {
			const user = this.context

			if (user.isTeacher) {
				return (
					<TeacherAssignment/>
				)
			} 
			return (
				<StudentAssignment/>
			)
    }
}

export default Assignments
