import { useState, useEffect } from 'react';
import './App.css';
import { BasicInfo } from './Components/BasicInfo';

function App() {

  const [data, setData] = useState(null);
  const [code, setCode] = useState(null);
  const [dataRecieved, setDataRecieved] = useState(null);
  /*
    useEffect(() => {
      fetch("http://localhost:3001/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
  */
  const handleChange = e => {
    setCode(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/${code}`)
      .then((res) => res.json())
      .then(data => setDataRecieved(data));
  }

  let jsx = (
    <form onSubmit={handleSubmit}>
      <label> Code </label>
      <input name="user" type="text" onChange={handleChange} />
      <button>Search</button>
    </form>
  );

  return (
    <div className="App">
      Keystone App
      {!dataRecieved ? jsx : <BasicInfo information={dataRecieved} />}
    </div>
  );
}

export default App;
