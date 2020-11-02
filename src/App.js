import React, { useState, useEffect } from 'react';
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Desafio ReactJS - ${Date.now()}`,
      "url": "https://github.com/hydeowatase/",
      "techs": ["Node", "Express", "TypeScript"]
    });

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id != id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(respository => <li key={respository.id}>{respository.title}<button onClick={() => handleRemoveRepository(respository.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
