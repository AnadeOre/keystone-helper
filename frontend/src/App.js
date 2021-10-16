import { useState } from 'react';
import './App.css';
import { BasicInfo } from './Components/BasicInfo';
import { Summary } from './Components/Summary';

function App() {

  const [link, setLink] = useState(null);
  const [dataRecieved, setDataRecieved] = useState(null);
  /*
    useEffect(() => {
      fetch("http://localhost:3001/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
  */
  const handleChange = e => {
    setLink(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let code
    if (link.length > 16) {
      code = link.substring(link.length - 16)
      console.log(code)
    }
    else {
      code = link
    }

    console.log(code)
    fetch(`http://localhost:3001/api/${code}`)
      .then((res) => res.json())
      .then(data => setDataRecieved(data));
  }

  let jsx = (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label> Insert WarcraftLogs report code: </label>
        <input name="user" type="text" onChange={handleChange} />
        <button type='submit'>Analyze!</button>
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
