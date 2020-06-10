import React, { Component } from 'react'
import { Button, ListGroupItem, FormGroup, Label, Input } from "reactstrap";

export class TutorialListItem extends Component {

    clickHandler = (e) => {
        e.preventDefault();
      };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
    render() {
        const { id, title } = this.props.question;

        return (
            <ListGroupItem>
                <h5> Question {id} </h5>
                {title}
                <Button style={{ margin: "6px" }} onClick={this.props.delQuestion.bind(this, id)} close/>
                <FormGroup>
                <Input type="textarea" name="text" id="code" placeholder="write code here..."
                    onChange={this.onChange}/>
                </FormGroup>
            </ListGroupItem>
        )
    }
}

export default TutorialListItem
