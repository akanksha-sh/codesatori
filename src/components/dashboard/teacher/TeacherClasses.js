import React, { Component } from 'react'
import { ListGroup } from 'reactstrap';
import ClassListItem from './ClassListItem';
import {listGroup} from '../../../Style'

export class TeacherClasses extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div >
                <h4>Active</h4>
                <ListGroup style={listGroup} >
                    {this.props.classes.map(function(d, idx){
                        if (d.active) {
                             return (<ClassListItem class={d} />);
                        }
                    })}
                </ListGroup>
                <h4>Inactive</h4>
                <ListGroup style={listGroup} >
                    {this.props.classes.map(function(d, idx){
                        if (!d.active) {
                             return (<ClassListItem class={d} />);
                        }
                    })}
                </ListGroup>
                {/* <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} delTodo={this.delTodo} /> */}
            </div>
        )
    }
}

export default TeacherClasses
