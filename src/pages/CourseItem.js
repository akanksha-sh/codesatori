import React from 'react'
import PropTypes from 'prop-types';
import "../index.css"

export class TodoItem extends React.Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10 px',
            borderBottom: '1px #ccc dotted', 
            borderTop: '1px #ccc dotted', 
            textDecoration: this.props.todo.completed ? 
            'line-through' : 'none'
        }
    }

    render() {
        const {id, title, students, noAssignments, ongoing, pending, marked} = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <div className= "dropdown">
                    <button style={infoBtn}> i </button>
                        <div className= "dropdown-content">
                        <span> &nbsp; <h4 style={{textAlign:"center"}}> {title} </h4></span>
                        <p> &nbsp; Number of students :          {students}</p>
                        <p> &nbsp; Number of assignements :      {noAssignments}</p>
                        <ul style={{alignContent: "right", listStyle:'none'}}>
                            <li style={itemStyle}> Ongoing : {ongoing} </li>
                            <li style={itemStyle}> Pending :  {pending} </li>
                            <li style={itemStyle}> Marked :  {marked} </li>
                        </ul>
                        </div>
                    </div>
                    <span> &nbsp; {title} </span>
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}> x </button>
                </p>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired,
}

const btnStyle = { 
    color: '000',
    background: '#ff0000',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer', 
    float: 'right'
}

const infoBtn = { 
    color: '#ffffff',
    background: '#000',
    padding: '5px 11px',
    borderRadius: '50%',
    cursor: 'pointer', 
    float: 'left',
    border: 'none'
}

const itemStyle = { 
    padding: '11px 11px',
    cursor: 'pointer', 
}

export default TodoItem

