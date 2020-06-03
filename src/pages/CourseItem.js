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
        const { id, title} = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <div className= "dropdown">
                    <button style={infoBtn}> i </button>
                        <div className= "dropdown-content">
                        <h4>Number of assignements</h4>
                        <h4>Number of submitted assignements</h4>
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

export default TodoItem

