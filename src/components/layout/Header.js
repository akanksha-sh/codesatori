import React, { Component } from 'react'
import TeacherDashboardHeader from './TeacherDashboardHeader'
import StudentDashboardHeader from './StudentDashboardHeader'
import LoginHeader from './LoginHeader'

export class Header extends Component {
    render() {
			if (!this.props.isLoggedIn) {return <LoginHeader/>}
			else if (this.props.accountType === "teacher") {return <TeacherDashboardHeader/>}
			else if (this.props.accountType === "student") {return <StudentDashboardHeader/>};
    }
}

export default Header

