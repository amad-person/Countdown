import React, {Component} from "react";
import CountdownCard from "./CountdownCard/CountdownCard";

class CountdownCardList extends Component {
    render() {
        return this.props.countdownCards.map((countdownCard, index) => {
            return (
                <CountdownCard
                    deleteHandler={() => this.props.deleteHandler(index)}
                    eventName={countdownCard.eventName}
                    eventDate={countdownCard.eventDate}
                    randomBgColor={countdownCard.randomBgColor}
                    key={index}
                />
            );
        });
    }
}

export default CountdownCardList;
