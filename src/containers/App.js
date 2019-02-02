import React, {Component} from "react";
import CountdownForm from "./CountdownForm/CountdownForm";
import {Card} from "semantic-ui-react";
import CountdownCardList from "../components/CountdownCardList/CountdownCardList";
import "./App.css";

class App extends Component {
    state = {
        countdownCards: [
            {
                eventName: "Special Occasion",
                eventDate: "2019-02-12",
                randomBgColor: "hsl(50, 100%, 75%)"
            }
        ]
    };

    handleSubmit = (countdownCard) => {
        this.setState({
            countdownCards: [...this.state.countdownCards, countdownCard]
        });
    };

    handleDelete = (index) => {
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
                <CountdownForm handleSubmit={this.handleSubmit}/>
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
