import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import TeacherAssignments from '../../pages-old/Assignment'

export class Assignments extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
    }

    render() {
        const user = this.context

        if (user.isTeacher) {
            return (
                <TeacherAssignments/>
            )
        } 
        // return (
        //     <StudentAssignments/>
        // )
    }
}

export default Assignments
