import React from "react";
import TodoItem from "./ClassInfo";
import PropTypes from "prop-types";

export default class Classes extends React.Component {
  render() {
    return this.props.todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} delTodo={this.props.delTodo} />
    ));
  }
}

Classes.propTypes = {
  todos: PropTypes.array.isRequired,
  delTodo: PropTypes.func.isRequired,
};

