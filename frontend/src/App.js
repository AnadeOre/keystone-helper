import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);
  const [dataRecieved, setDataRecieved] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleChange = e => {
    setCode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/${code}`)
      .then((res) => res.json())
      .then(data => setDataRecieved(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        This is a cool app
        <p>{!data ? '...Loading' : data}</p>
        <form onSubmit={handleSubmit}>
          <label> Code </label>
          <input name="user" type="text" onChange={handleChange} />
          <button>Search</button>
        </form>

      </header>
    </div>
  );
}

export default App;
