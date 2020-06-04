import React from "react";
import PropTypes from "prop-types";

export default class ClassInfo extends React.Component {
  render() {
    const {
      id,
      title,
      students,
      noAssignments,
      ongoing,
      pending,
      marked,
    } = this.props.todo;
    return (
      <div style={classBarStyle}>
        <p>
          <div className="dropdown">
            <div className="dropdown-content">
              <span>
                {" "}
                &nbsp; <h4 style={{ textAlign: "center" }}> {title} </h4>
              </span>
              <p> &nbsp; Number of students : {students}</p>
              <p> &nbsp; Number of assignements : {noAssignments}</p>
              <ul style={{ alignContent: "right", listStyle: "none" }}>
                <li style={itemStyle}> Ongoing : {ongoing} </li>
                <li style={itemStyle}> Pending : {pending} </li>
                <li style={itemStyle}> Marked : {marked} </li>
              </ul>
            </div>
          </div>
          <span> &nbsp; {title} </span>
          <button
            onClick={this.props.delTodo.bind(this, id)}
            style={deleteButtonStyle}
          >
            {" "}
            x{" "}
          </button>
          <button style={infoButtonStyle}> i </button>
        </p>
      </div>
    );
  }
}

ClassInfo.propTypes = {
  todo: PropTypes.object.isRequired,
  delTodo: PropTypes.func.isRequired,
};

const classBarStyle = {
  alignItems: "center",
  background: "#f4f4f4",
  borderBottom: "1px #ccc dotted",
  borderTop: "1px #ccc dotted",
};

const deleteButtonStyle = {
  color: "000",
  background: "#ff0000",
  border: "none",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

const infoButtonStyle = {
  color: "#ffffff",
  background: "#000",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
  border: "none",
};

const itemStyle = {
  padding: "11px 11px",
  cursor: "pointer",
  alignItems: "center",
  background: "#000",
  display: "flex",
};
