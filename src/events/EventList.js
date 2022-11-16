import React, { useContext } from "react";
import EventContext from "../data-stores/EventContext";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';

function EventList() {
    const { events } = useContext(EventContext);
    console.log(events);
    return (
        <div>
            <h1>EVENTS BELOW:</h1>
            <ListGroup>
                {events.map(e =>
                    <ListGroupItem>
                        <Link to={`/events/${e.eventId}`}>{e.locationHandle.toUpperCase()}</Link>
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    )
}

export default EventList;