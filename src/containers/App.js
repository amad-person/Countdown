import React, { Component } from "react";
import CountdownForm from "./CountdownForm/CountdownForm";
import { Card } from "semantic-ui-react";
import CountdownCardList from "../components/CountdownCardList/CountdownCardList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdownCards: [
        {
          eventName: "Special Occasion",
          eventDate: "2019-02-12",
          randomBgColor: "hsl(50, 100%, 75%)"
        }
      ]
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({
            [key]: value
          });
        } catch (err) {
          this.setState({
            [key]: value
          });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  handleSubmit = countdownCard => {
    this.setState({
      countdownCards: [...this.state.countdownCards, countdownCard]
    });
  };

  handleDelete = index => {
    const newCountdownCards = this.state.countdownCards;
    newCountdownCards.splice(index, 1);
    this.setState({
      countdownCards: newCountdownCards
    });
  };

  render() {
    return (
      <div className="App">
        <h1 id="title">Countdown</h1>
        <p id="subtitle">Add an event to track how many days are left!</p>
        <CountdownForm handleSubmit={this.handleSubmit} />
        <Card.Group stackable className="CountdownCardList" itemsPerRow={3}>
          <CountdownCardList
            countdownCards={this.state.countdownCards}
            deleteHandler={this.handleDelete}
          />
        </Card.Group>
      </div>
    );
  }
}

export default App;
