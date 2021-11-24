import { useState } from 'react';
import { MainScreen } from './Components/MainScreen';
import { Summary } from './Components/Summary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [dataRecieved, setDataRecieved] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<MainScreen setDataRecieved={setDataRecieved} />}
        />
        <Route
          path='/report/:code'
          element={<Summary props={dataRecieved} />}
        />
        {/*<Route path="/report/player/:playerID" children={<Player />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
