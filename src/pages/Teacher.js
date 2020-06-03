import React, { Component } from 'react'
import Todos from './Todos';
import AddTodo from './AddTodo';


export class Teacher extends Component {
    state = {
        todos: [
          {
            id: 1,
            title: 'A-Level Computer Science',
            completed: false
          },
          {
            id: 2,
            title: 'A-Level Further Maths',
            completed: false
          },
          {
            id: 3,
            title: 'IGCSE Computer Science',
            completed: false
          },
        ]
      }
    markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
        if(todo.id === id) {
        todo.completed = !todo.completed
        }
        return todo;
    }) })
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
            <h3> Courses </h3>
            <AddTodo addTodo={this.addTodo}/>
            <Todos todos={this.state.todos} markComplete={this.markComplete} 
            delTodo= {this.delTodo}/>
        </div>
        </div>
    );
    }   
}

export default Teacher


