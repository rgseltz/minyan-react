import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import LocationContext from "../data-stores/LocationContext";
import EventContext from "../data-stores/EventContext";
import { Label, Form, FormGroup, Button, Input } from "reactstrap";

function NewEventForm() {
    const INITIAL_STATE = {
        locationId: '',
        startTime: '',
        endTime: '',
        serviceType: '',
        maxCapacity: ''
    };
    const history = useHistory()
    const { locations } = useContext(LocationContext);
    const { createEvent } = useContext(EventContext);
    const [formData, setFormData] = useState(INITIAL_STATE);
    console.log(locations);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(formData);
        await createEvent(formData);
        history.push('/events');
    }

    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="location-id">Location</Label>
                    <Input type="select" id="location-id" name="locationId" value={formData.locationId} placeholder="Location" onChange={handleChange}>
                        {locations.map(l => <option value={l.id}>{l.handle}</option>)}
                    </Input>

                    <Link to={'/locations/new'}><Button>Custom Location</Button></Link>

                </FormGroup>
                <FormGroup>
                    <Label for="start-time">Start Time</Label>
                    <Input id="start-time" name="startTime" value={formData.startTime} placeholder="Start Time" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="end-time">End Time</Label>
                    <Input id="end-time" name="endTime" value={formData.endTime} placeholder="End Time" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="service-type">Prayer Service</Label>
                    <Input type='select' id="service-type" name="serviceType" value={formData.serviceType} onChange={handleChange}>
                        <option value="morning">Shachris</option>
                        <option value="afternoon">Minchah</option>
                        <option value="night">Maariv</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="max-capacity">Maximum Capacity</Label>
                    <Input id="max-capacity" name="maxCapacity" value={formData.maxCapacity} placeholder="Maximum Number of People" onChange={handleChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default NewEventForm;