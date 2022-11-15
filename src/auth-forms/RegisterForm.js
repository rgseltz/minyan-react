import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Label, Form, FormGroup, Input, Button } from 'reactstrap';

function RegisterForm({ signup }) {
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }))
        console.log(formData);
    }
    const resetFormData = () => {
        setFormData(INITIAL_STATE);
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await signup(formData);
        history.push('/events');
        resetFormData(INITIAL_STATE);
    }
    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input id="username" name="username" value={formData.username} placeholder="Username" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="first-name">First Name</Label>
                    <Input id="first-name" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="last-name">Last Name</Label>
                    <Input id="last-name" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" name="email" value={formData.email} placeholder="Email Address" onChange={handleChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default RegisterForm;