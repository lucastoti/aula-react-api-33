import React, { useState } from 'react';

const App = () => {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produto, setProduto] = useState({});
  const [produtoAtualizado, setProdutoAtualizado] = useState({});
  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState('');

  const getLista = () => {
    fetch('https://dummyjson.com/products')
    .then(data => data.json())
    .then(resposta => {
      setListaProdutos(resposta.products);
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

  return (
    <div>
      <div>
        <button onClick={getLista} style={{ borderColor: 'blue' }}>Trazer a lista</button>
        {
          listaProdutos.length ?
          listaProdutos.map(produto => {
            return <div key={produto.id}>{produto.title}</div>
          })
          : <div></div>
        }
      </div>
      <br /><br /><br />
      <div>
        <input placeholder="ID" onChange={(event) => valorDigitado(event)} />
        <button onClick={getProdutoId} style={{ borderColor: 'red' }}>Buscar por ID</button>
        <br />
        { produto ? produto.description : '' }
      </div>
      <br /><br /><br />
      <div>
        <input placeholder="ID" onChange={(event) => valorDigitado(event)} /><br />
        Titulo:<input placeholder="Titulo" onChange={(event) => setTitulo(event.target.value)} />
        <button onClick={atualizarProdutoId} style={{ borderColor: 'red' }}>Atualizar por ID</button>
        
        <br />
        Atualizado:{ produtoAtualizado ? JSON.stringify(produtoAtualizado) : '' }
      </div>
    </div>
  );
};

export default App;
