import React, { Component } from 'react'
import DashboardHeader from './DashboardHeader'
import LoginHeader from './LoginHeader'

export class Header extends Component {
    render() {
        return (
            this.props.isLogged? <DashboardHeader/> : <LoginHeader/>
        )
    }
}

export default Header

