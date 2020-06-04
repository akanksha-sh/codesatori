import React, { Component } from 'react'
import NavigationBar from './NavigationBar'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Classes from './Classes';
import Assignments from './Assignments'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <Router>
                    <NavigationBar />
                    <div className="content-container">
                        <div style={contentStyle} className="container">
                            <Route exact path="/classes" component={Classes} />
                            <Route exact path="/assignments" component={Assignments} />
                        </div>
                    <Redirect exact from="/" to="/classes" />
                    </div>
                </Router>
            </div>
        )
    }
}

const contentStyle = {
    margin: "50px auto"
}

export default Dashboard
