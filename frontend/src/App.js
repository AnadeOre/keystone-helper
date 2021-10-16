import { useState } from 'react';
import './App.css';
import { BasicInfo } from './Components/BasicInfo';
import { Summary } from './Components/Summary';

function App() {

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
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label> Insert WarcraftLogs report code: </label>
        <input name="user" type="text" onChange={handleChange} />
        <button>Analyze!</button>
      </form>
    </div>
  );

  return (
    <div className="App">
      Keystone App
      {!dataRecieved ? jsx : <Summary information={dataRecieved} />}
    </div>
  );
}

export default App;
