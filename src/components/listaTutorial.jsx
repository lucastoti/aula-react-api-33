import React, { useState } from 'react';
import { ListGroup, Modal, Button } from 'react-bootstrap';

export const ListaTutorial = (props) => {
	const [show, setShow] = useState(false);
	const [linhaSelecionada, setLinhaSelecionada] = useState({});

	const mostrarModal = (tutorial) => {
		setLinhaSelecionada(tutorial);
		setShow(true);
	};

	 const deletarTutorialId = () => {
	    let URL = 'http://localhost:9000/api/tutorials/' + linhaSelecionada.id;
	    fetch(URL, {
	      method: 'DELETE'
	    })
	    .then(data => data.json())
	    .then(resposta => {
	    	setShow(false);
	    	props.atualizarTutorial();
	    });
	  };

	return (
		<>
			<ListGroup>
		    	{
		    		props.lista.map(tutorial => {
		    			return <ListGroup.Item 
		    					key={tutorial.id}
		    					action
		    					onClick={() => mostrarModal(tutorial)}
	    					   >
	    					   	{tutorial.title}
	    					   </ListGroup.Item>;
		    		})
		    	}
		    </ListGroup>
		    <Modal show={show} onHide={() => setShow(false)}>
		        <Modal.Header closeButton>
		          <Modal.Title>{linhaSelecionada.title}</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>{linhaSelecionada.description}</Modal.Body>
		        <Modal.Footer>
			        <Button onClick={deletarTutorialId} variant="danger">Deletar</Button>
			    </Modal.Footer>
		     </Modal>
		</>
	);
};
