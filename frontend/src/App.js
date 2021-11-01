import React, { useState } from 'react';
import { MainScreen } from './Components/MainScreen';
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

  async function handleSubmit(setIsLoading) {
    setIsLoading(true);
    let code;
    if (link.length > 16) {
      code = link.substring(link.length - 16);
    } else {
      code = link;
    }
    const dataFromAPI = await fetchApi(code);
    if (!dataFromAPI.error) {
      setDataRecieved(dataFromAPI);
      setIsLoading(false);
      history.push(`/${code}`);
    }
  }

  return (
    <Router history={history}>
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
    </Router>
  );
}

export default App;
