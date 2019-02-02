import React from "react";
import {Card, Button} from "semantic-ui-react";
import moment from 'moment';
import './CountdownCard.css';

const countdownCard = props => {
    console.log(props.randomBgColor);

    let style = {
        backgroundColor: props.randomBgColor,
        padding: '1.5em'
    };

    let currentDate = moment(), futureDate = moment(props.eventDate);

    return (
        <Card className="CountdownCard" style={style}>
            <Button id="deleteButton" icon="trash alternate outline"
                    onClick={props.deleteHandler}
            />
            <h3 id="eventName">{props.eventName}</h3>
            <h2 id="numDays">{futureDate.diff(currentDate, 'days')}</h2>
            <p id="unitTime">DAYS</p>
        </Card>
    );
};

export default countdownCard;
