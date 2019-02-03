import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import moment from "moment";
import "./CountdownForm.css";

class CountdownForm extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      eventName: "",
      eventDate: "",
      randomBgColor: "",
      formErrors: {
        eventName: "",
        eventDate: ""
      },
      eventNameValid: false,
      eventDateValid: false,
      formValid: false
    };

    this.state = this.defaultState;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  hasError(error) {
    return error.length > 0;
  }

  validateField = (fieldName, value) => {
    let formErrors = this.state.formErrors,
      eventNameValid = this.state.eventNameValid,
      eventDateValid = this.state.eventDateValid;
    switch (fieldName) {
      case "eventName":
        value = value.trim();
        eventNameValid = value.length > 0;
        formErrors.eventName = eventNameValid
          ? ""
          : "Please enter a valid event name";
        break;
      case "eventDate":
        let currentDate = moment(),
          inputDate = moment(value);
        eventDateValid = inputDate.diff(currentDate, "days") >= 0;
        formErrors.eventDate = eventDateValid
          ? ""
          : "Please enter a date in the future";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: formErrors,
        eventNameValid: eventNameValid,
        eventDateValid: eventDateValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const formValid = this.state.eventNameValid && this.state.eventDateValid;
    this.setState({
      formValid: formValid
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
        const countdownCard = {
          eventName: this.state.eventName,
          eventDate: this.state.eventDate,
          randomBgColor: this.state.randomBgColor
        };

        this.props.handleSubmit(countdownCard);
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
          <Form.Field
            error={this.hasError(this.state.formErrors.eventName)}
            required
            width={8}
          >
            <label>Event</label>
            <input
              name="eventName"
              onBlur={() =>
                this.validateField("eventName", this.state.eventName)
              }
              onChange={this.handleChange}
              type="text"
              value={this.state.eventName}
            />
            {this.hasError(this.state.formErrors.eventName) ? (
              <Label basic color="red" pointing>
                {this.state.formErrors.eventName}
              </Label>
            ) : null}
          </Form.Field>
          <Form.Field
            error={this.hasError(this.state.formErrors.eventDate)}
            required
            width={8}
          >
            <label>Date</label>
            <input
              name="eventDate"
              onBlur={() =>
                this.validateField("eventDate", this.state.eventDate)
              }
              onChange={this.handleChange}
              type="date"
              value={this.state.eventDate}
            />
            {this.hasError(this.state.formErrors.eventDate) ? (
              <Label basic color="red" pointing>
                {this.state.formErrors.eventDate}
              </Label>
            ) : null}
          </Form.Field>
        </Form.Group>
        <Form.Button
          disabled={!this.state.formValid}
          id="submitButton"
          primary
          type="submit"
        >
          Add Event!
        </Form.Button>
      </Form>
    );
  }
}

export default CountdownForm;
