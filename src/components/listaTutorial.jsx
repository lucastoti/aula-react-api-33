import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export const ListaTutorial = ({ lista }) => {
	return (
	    <ListGroup>
	    	{
	    		lista.map(tutorial => {
	    			return <ListGroup.Item key={tutorial.id}>{tutorial.title}</ListGroup.Item>;
	    		})
	    	}
	    </ListGroup>
	);
};
