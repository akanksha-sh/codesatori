import React, { Component } from 'react'
import Todos from './Courses';
import AddTodo from './AddTodo';

export class Teacher extends Component {
    state = {
        todos: [
          {
            id: 1,
            title: 'A-Level Computer Science',
            students: 90,
            noAssignments: 5,
            ongoing: 1,
            pending: 2,
            marked:  2,
          },
          {
            id: 2,
            title: 'A-Level Further Maths',
            students: 60,
            noAssignments: 6,
            ongoing: 2,
            pending: 2,
            marked:  2,
          },
          {
            id: 3,
            title: 'IGCSE Computer Science',
            students: 80,
            noAssignments: 4,
            ongoing: 1,
            pending: 0,
            marked:  3,
          },
        ]
      }

    delTodo = (id) => {
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] 
    })
    }

    addTodo = (title) => {
    const newTodo = {
        id: 7,
        title,
        completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo]})
    }

    render() {
    return (
        <div className="App">
        <div className="container">
            <h3 style={{textAlign:"center"}}> Courses </h3>
            <AddTodo addTodo={this.addTodo}/>
            <Todos todos={this.state.todos} delTodo= {this.delTodo}/>
        </div>
        </div>
    );
    }   
}

export default Teacher


