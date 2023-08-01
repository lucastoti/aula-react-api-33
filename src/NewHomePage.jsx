import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

const App = () => {
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({
  	firstName: '',
  	lastName: '',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(state);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

   const handleChange = e => {
    setState(prev => { return { ...prev, [e.target.name]: e.target.value } });
  };

  return (
  	<div className="bg-dark text-white">
	    <Form noValidate validated={validated} onSubmit={handleSubmit}>
	      <Row className="mb-3">
	        <Form.Group as={Col} md="4">
	          <Form.Label>First name</Form.Label>
	          <Form.Control
	            name="firstName"
	            type="text"
	            placeholder="First name"
	            onChange={handleChange}
	          />
	        </Form.Group>
	        <Form.Group as={Col} md="4">
	          <Form.Label>Last name</Form.Label>
	          <Form.Control
	            name="lastName"
	            type="text"
	            placeholder="Last name"
	            onChange={handleChange}
	          />
	        </Form.Group>
	        <Form.Group as={Col} md="4">
	          <Form.Label>Username</Form.Label>
	          <InputGroup hasValidation>
	            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
	            <Form.Control
	              type="text"
	              placeholder="Username"
	              aria-describedby="inputGroupPrepend"
	              required
	            />
	            <Form.Control.Feedback type="invalid">
	              Please choose a username.
	            </Form.Control.Feedback>
	          </InputGroup>
	        </Form.Group>
	      </Row>
	      <Row className="mb-3">
	        <Form.Group as={Col} md="6">
	          <Form.Label>City</Form.Label>
	          <Form.Control type="text" placeholder="City" required />
	          <Form.Control.Feedback type="invalid">
	            Please provide a valid city.
	          </Form.Control.Feedback>
	        </Form.Group>
	        <Form.Group as={Col} md="3">
	          <Form.Label>State</Form.Label>
	          <Form.Control type="text" placeholder="State" required />
	          <Form.Control.Feedback type="invalid">
	            Please provide a valid state.
	          </Form.Control.Feedback>
	        </Form.Group>
	        <Form.Group as={Col} md="3">
	          <Form.Label>Zip</Form.Label>
	          <Form.Control type="text" placeholder="Zip" required />
	          <Form.Control.Feedback type="invalid">
	            Please provide a valid zip.
	          </Form.Control.Feedback>
	        </Form.Group>
	      </Row>
	      <Form.Group className="mb-3">
	        <Form.Check
	          required
	          label="Agree to terms and conditions"
	          feedback="You must agree before submitting."
	          feedbackType="invalid"
	        />
	      </Form.Group>
	      <Button type="submit">Submit form</Button>
	    </Form>
  	</div>
  );
};

export default App;
