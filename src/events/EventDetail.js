import React, { useContext } from "react";
import EventContext from "../data-stores/EventContext";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, CardTitle, CardBody, CardSubtitle, CardText } from 'reactstrap'

function EventDetail() {
    const { eventId } = useParams();
    const { events, attend } = useContext(EventContext);
    let event = events.find(e => e.eventId === +eventId);
    console.log('event', event)
    let history = useHistory();
    const handleAttend = async () => {
        await attend(eventId);
        history.push('/events');
    }
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>Minyan Details</CardTitle>
                    <CardSubtitle>Minyan Name: {event.locationHandle}</CardSubtitle>
                    <CardText>Address: {event.streetNum} {event.streetName}</CardText>
                    <CardText>{event.city} {event.zip}</CardText>
                    <CardText>Davening Information:</CardText>
                    <CardText>Service: {event.serviceType}</CardText>
                    <CardText>Start Time: {event.startTime}</CardText>
                    <CardText>End Time: {event.endTime}</CardText>
                    <CardText>People Attending: {event.currentCapacity}</CardText>
                    {event.isPublic ? <p>This minyan is in a public location</p> : <p>This minyan is in a private location.</p>}
                    <Button onClick={handleAttend}>Join Minyan</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default EventDetail;