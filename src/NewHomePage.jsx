import React, { useState, useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row, ListGroup} from 'react-bootstrap';
import { ListaTutorial } from './components/listaTutorial';
import './NewHomePage.css';

const App = () => {
  const [validated, setValidated] = useState(false);
  const [tutoriais, setTutoriais] = useState([]);
  const [state, setState] = useState({
  	title: '',
  	description: '',
  	published: false
  });

  useEffect(() => {
    trazerListaTutoriais();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) { // houve erro
      event.preventDefault();
      event.stopPropagation();
    } else {
    	criarTutorial();
    }
    setValidated(true);
  };

  const trazerListaTutoriais = () => {
  	fetch('http://localhost:9000/api/tutorials')
    .then(data => data.json())
    .then(resposta => {
      setTutoriais(resposta);
    });
  }

  const criarTutorial = () => {
  	let URL = 'http://localhost:9000/api/tutorials';

  	fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    })
    .then(data => data.json())
    .then(resposta => {
      trazerListaTutoriais();
    });
  };

  const handleChange = e => {
    setState(anterior => { 
    	return { 
    		...anterior,
    		[e.target.name]: 
    			e.target.name == 'published' ? e.target.checked : e.target.value 
    	} 
    });
  };

  return (
  	<div className="p-5">
		  {
        tutoriais.length ?
        <ListaTutorial lista={tutoriais} atualizarTutorial={trazerListaTutoriais} />
        : <div></div>
      }

	    <Form className="pt-5" noValidate validated={validated} onSubmit={handleSubmit}>
	      <Row className="mb-3">
	        <Form.Group as={Col} md="2">
	          <Form.Label>Titulo</Form.Label>
	          <InputGroup hasValidation>
	            <Form.Control
	            	name="title"
	              type="text"
	              placeholder="Titulo"
	              onChange={handleChange}
	              required
	            />
	            <Form.Control.Feedback type="invalid">
	              Campo obrigatório.
	            </Form.Control.Feedback>
	          </InputGroup>
	        </Form.Group>
	        <Form.Group as={Col} md="5">
	          <Form.Label>Descrição</Form.Label>
	          <InputGroup hasValidation>
	            <Form.Control
	            	name="description"
	              type="text"
	              placeholder="Descrição"
	              onChange={handleChange}
	              required
	            />
	            <Form.Control.Feedback type="invalid">
	              Campo obrigatório.
	            </Form.Control.Feedback>
	          </InputGroup>
	        </Form.Group>
	        <Form.Group className="center" as={Col} md="2">
		        <Form.Check
		        	name="published"
		          label="Publicado"
		          onChange={handleChange}
		        />
		      </Form.Group>
		      <Form.Group className="center" as={Col} md="3">
		      	<Button type="submit" >Criar</Button>
		      </Form.Group>
	      </Row>
	    </Form>
  	</div>
  );
};

export default App;
