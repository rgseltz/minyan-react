import React, { useContext } from "react";
import EventContext from "../data-stores/EventContext";
import EventCard from "./EventCard";
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
                        <h1>Minyan Details</h1>
                        <h2>Minyan Name: {e.locationHandle}</h2>
                        <p>Address: {e.streetNum} {e.streetName}</p>
                        <p>{e.city} {e.zip}</p>
                        <p>Davening Information:</p>
                        <p>Service: {e.serviceType}</p>
                        <p>Start Time: {e.startTime}</p>
                        <p>End Time: {e.endTime}</p>
                        <p>People Attending: {e.currentcapacity}</p>
                        {e.isPublic ? <p>This minyan is in a public location</p> : <p>This minyan is in a private location.</p>}
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    )

    {/* <ListGroup>
                {events.map(e =>
                    <ListGroupItem>
                        <EventCard key={e.eventId}
                            eventId={e.eventId}
                            locationHandle={e.locationHandle}
                            locationId={e.locationId}
                            streetNum={e.streetNum}
                            streetName={e.streetName}
                            city={e.city}
                            zip={e.zip}
                            serviceType={e.serviceType}
                            start={e.startTime}
                            end={e.endTime}
                            attending={e.currentCapacity}
                            isPublic={e.isPublic} />
                    </ListGroupItem>
                )}
            </ListGroup> */}
}

export default EventList;