import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import TeacherClasses from './teacher/TeacherClasses'
import {pageTitle, contentDiv} from '../../Style'

export class Classes extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            classes: []
        };
    }

    componentDidMount() {
        this.setState({classes: retrievedClasses});
    }

    render() {
        const user = this.context

        if (user.isTeacher) {
            return (
                <div style={contentDiv}>
                    <h2 style={pageTitle}> Classes </h2>
                    <TeacherClasses classes={this.state.classes}/>
                </div>
            )
        } 
        return (
            <div></div>
        )
        // return (
        //     <StudentClasses/>
        // )
    }
}

export default Classes

const retrievedClasses = 
    [
        {
          id: 1,
          title: "A-Level Computer Science",
          students: 90,
          noAssignments: 5,
          ongoing: 1,
          pending: 2,
          marked: 2,
          active: true
        },
        {
          id: 2,
          title: "A-Level Further Maths",
          students: 60,
          noAssignments: 6,
          ongoing: 2,
          pending: 2,
          marked: 2,
          active: true
        },
        {
          id: 3,
          title: "IGCSE Computer Science",
          students: 80,
          noAssignments: 4,
          ongoing: 1,
          pending: 0,
          marked: 3,
          active: true
        },
        {
            id: 4,
            title: "A-Level Chemistry",
            students: 20,
            noAssignments: 5,
            ongoing: 1,
            pending: 2,
            marked: 2,
            active: false
          }
      ]