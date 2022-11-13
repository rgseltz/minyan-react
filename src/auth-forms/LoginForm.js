import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function LoginForm({ login }) {
    const INITIAL_STATE = {
        username: '',
        password: ''
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
        await login(formData);
        history.push('/events');
        resetFormData(INITIAL_STATE);
    }
    return (
        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input id="username" name="username" value={formData.username} placeholder="Username" onChange={handleChange} />
                </FormGroup>                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" name="password" value={formData.password} placeholder="Username" onChange={handleChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default LoginForm;