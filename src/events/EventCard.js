import { React } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

function EventCard({
    key, eventId, handle, locationId, streetNum, streetName, city, zip, service, start, end, attending, isPublic
}) {
    console.log({ handle })
    return (
        <h1>WHAT'S GOING ON!?</h1>
    )
    //     <>
    //         <h1>Minyan Details</h1>
    //         <h2>Minyan Name: {handle}</h2>
    //         {/* <CardText>Address: {streetNum} {streetName}</CardText>
    //                     <CardText>{city} {zip}</CardText>
    //                     <CardText>Davening Information:</CardText>
    //                     <CardText>Service: {service}</CardText>
    //                     <CardText>Start Time: {start}</CardText>
    //                     <CardText>End Time: {end}</CardText>
    //                     <CardText>People Attending: {attending}</CardText>
    //                     {{ isPublic } ? <CardText>This minyan is in a public location</CardText> : <CardText>This minyan is in a private location.</CardText>} */}
    //     </>
    // );
}

export default EventCard;