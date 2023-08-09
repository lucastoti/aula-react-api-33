import React, { useState, useEffect } from 'react';
import { 
  Button,
  Container,
  Row,
  Col,
  Toast
} from 'react-bootstrap';
import { ListaTutorial } from './components/listaTutorial';
import './HomePage.css';


const App = () => {
  const [lista, setLista] = useState([]);
  const [produto, setProduto] = useState({});
  const [produtoAtualizado, setProdutoAtualizado] = useState({});
  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [tutorialDeletado, setTutorialDeletado] = useState(null);
  const [contador, setContador] = useState(0);

  const [showError, setShowError] = useState(false);

  // useEffect(() => {
  //   getLista();
  // }, []); // essa função vai ser chamada no inicio da pagina

  useEffect(() => {
    if(id) {
      buscarPorID();
    } else {
      getLista();
    }
  }, [id]);

  const getLista = () => {
    fetch('http://localhost:9000/api/tutorials')
    .then(data => data.json())
    .then(resposta => {
      setLista(resposta);
    });
  };

  const buscarPorID = () => {
    let URL = 'http://localhost:9000/api/tutorials/' + id;
    fetch(URL)
    .then(data => data.json())
    .then(resposta => {
      if (resposta.message) {
        setShowError(true);
      } else {
        setLista([resposta]);
      }
    });
  };

  const valorDigitado = (event) => {
    setId(event.target.value);
  };

  const getProdutoId = () => {
    let URL = 'https://dummyjson.com/products/' + id;
    fetch(URL)
    .then(data => data.json())
    .then(resposta => {
      setProduto(resposta);
    });
  };

  const atualizarProdutoId = () => {
    let URL = 'https://dummyjson.com/products/' + id;
    let body = {
      title: titulo
    };

    fetch(URL, {
      method: 'PUT', /* or PATCH */
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(data => data.json())
    .then(resposta => {
      setProdutoAtualizado(resposta);
    });
  };

    const deletarTutorialId = () => {
    let URL = 'http://localhost:9000/api/tutorials/' + id;
    fetch(URL, {
      method: 'DELETE'
    })
    .then(data => data.json())
    .then(resposta => {
      console.log(resposta);
      setTutorialDeletado(resposta);
    });
  };

  return (
   <Container>
    <Row className='row-spacing'>
      <Col>
        ID:<input placeholder="ID" onChange={(event) => setId(event.target.value)} />
        {/*<Button variant="primary" onClick={getLista}>Trazer a lista</Button>*/}
        {
          lista.length ?
          <ListaTutorial lista={lista} />
          : <div></div>
        }
      </Col>
    </Row>
{/*    <Row className='row-spacing'>
      <Col>
        <input placeholder="ID" onChange={(event) => valorDigitado(event)} />
        <button onClick={getProdutoId} style={{ borderColor: 'red' }}>Buscar por ID</button>
        <br />
        { produto ? produto.description : '' }
      </Col>
    </Row>
    <Row className='row-spacing'>
      <Col>
        <input placeholder="ID" onChange={(event) => valorDigitado(event)} /><br />
        Titulo:<input placeholder="Titulo" onChange={(event) => setTitulo(event.target.value)} />
        <button onClick={atualizarProdutoId} style={{ borderColor: 'red' }}>Atualizar por ID</button>
        
        <br />
        Atualizado:{ produtoAtualizado ? JSON.stringify(produtoAtualizado) : '' }
      </Col>
    </Row>
    <Row className='row-spacing'>
      <Col>
        <input placeholder="ID" onChange={(event) => valorDigitado(event)} />
        <Button onClick={deletarTutorialId}>Deletar por ID</Button>

        <div>
          {
            tutorialDeletado !== null && tutorialDeletado.message ?
            <span>{tutorialDeletado.message}</span> :
            <span></span>
          }
        </div>
      </Col>
    </Row>*/}
    <Toast className='toti-toast' onClose={() => setShowError(false)} show={showError} delay={3000} autohide> 
      <Toast.Header>
        Houve um erro
      </Toast.Header>
      <Toast.Body>Tutorial não encontrado</Toast.Body>
    </Toast>
  </Container>
  );
};

export default App;
