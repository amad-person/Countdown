import React, {Component} from "react";
import {Form} from "semantic-ui-react";
import "./CountdownForm.css";

class CountdownForm extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            eventName: "",
            eventDate: "",
            randomBgColor: ""
        };

        this.state = this.defaultState;
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const randomBgColor = this.getRandomColor();
        this.setState(
            {
                randomBgColor: randomBgColor
            },
            () => {
                console.log(this.state);
                this.props.handleSubmit(this.state);
                this.setState(this.defaultState);
            }
        );
    };

    getRandomColor = () => {
        return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    };

    render() {
        return (
            <Form className="Form" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Field width={8}>
                        <label>Event</label>
                        <input
                            type="text"
                            name="eventName"
                            value={this.state.eventName}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field width={8}>
                        <label>Date</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={this.state.eventDate}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Button primary type="submit">
                    Add Event!
                </Form.Button>
            </Form>
        );
    }
}

export default CountdownForm;
