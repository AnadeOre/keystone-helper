import { useState } from 'react';
import { MainScreen } from './Components/MainScreen';
import { Summary } from './Components/Summary';
import { Switch, Router, Route, useHistory } from 'react-router';
import { ChooseFight } from './Components/ChooseFight';

function App() {
  const [link, setLink] = useState(null);
  const [dataRecieved, setDataRecieved] = useState(null);
  const history = useHistory();

  const handleChange = e => {
    setLink(e.target.value);
  };

  async function fetchApi(code) {
    try {
      let res = await fetch(`http://localhost:3001/api/firstInfo/${code}`);
      let responseIsOK = res && res.ok;
      if (responseIsOK) {
        let data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    let code;
    if (link.length > 16) {
      code = link.substring(link.length - 16);
    } else {
      code = link;
    }
    const dataFromAPI = await fetchApi(code);
    if (dataFromAPI.error) console.log(dataFromAPI.error);
    if (!dataFromAPI.error) {
      setDataRecieved(dataFromAPI);
      history.push(`/${code}`);
    }
  }

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path='/'>
            <MainScreen
              onCodeWriting={handleChange}
              onCodeSubmit={handleSubmit}
            />
          </Route>
          <Route exact path='/:code'>
            <ChooseFight props={dataRecieved} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
