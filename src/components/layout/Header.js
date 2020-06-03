import React, { Component } from 'react'
import DashboardHeader from './DashboardHeader'
import LoginHeader from './LoginHeader'

export class Header extends Component {
    render() {
        return (
            // switched around for now need to fix bug 
            this.props.isLogged? <LoginHeader/> : <DashboardHeader/>
        )
    }
}

export default Header

