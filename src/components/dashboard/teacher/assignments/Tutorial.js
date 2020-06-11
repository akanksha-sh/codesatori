import React, { Component } from 'react'
import { pageTitle, contentDiv } from "../../../../Style";
import { ListGroup } from "reactstrap";
import { listGroup } from "../../../../Style";
import AddQuestion from './AddQuestion';
import TutorialListItem from './TutorialListItem';

export class Tutorial extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
          };
    }
    

    delQuestion = (id) => {
        this.setState({
          questions: [...this.state.questions.filter((i) => i.id !== id)],
        });
      }
    
      addQuestion = (title) => {
        const newQ = {
          id: this.state.id_next ++,
          title,
        };
        this.setState({ questions: [...this.state.questions, newQ] });
      };

    render() {
        const del = this.delQuestion
        return (
          <div>
            <h2 style={pageTitle}> Assignment 1: Intro to Python </h2>
            <br/>

            <AddQuestion addQuestion={this.addQuestion} />
            <br />
            <br />
            <div>
              <ListGroup style={listGroup}>
                {this.state.questions.map(function (d, idx) {
                    d.id = idx;
                    return <TutorialListItem key={idx} question={d} delQuestion={del} />;
                  }
                )}              
              </ListGroup>
            </div>
          </div>
        )
    }
}

export default Tutorial