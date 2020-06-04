import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import TeacherClasses from '../../pages/Teacher'

export class Classes extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
    }

    render() {
        const user = this.context

        if (user.isTeacher) {
            return (
                <TeacherClasses/>
            )
        } 
        // return (
        //     <StudentClasses/>
        // )
    }
}

export default Classes
