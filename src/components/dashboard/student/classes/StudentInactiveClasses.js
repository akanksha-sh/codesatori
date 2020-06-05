import React, { Component } from "react";
import ClassItem from './StudentClassItem'

export class StudentInactiveClasses extends Component {
    render() {
        if (this.props.classes.length === 0) {
            return (
                <div style={{fontSize:'8pt'}}>Nothing to show</div>
            )
        } else {
            return this.props.classes.map((classItem) => (<ClassItem key = {classItem.id} item={classItem}/>));
        }
        
    }
}

export default StudentInactiveClasses