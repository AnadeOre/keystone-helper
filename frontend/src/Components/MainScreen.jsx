import React, { useState } from 'react';
import '../Styles/MainScreen.css';

export const MainScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const performSubmit = e => {
    e.preventDefault();
    props.onCodeSubmit(setIsLoading);
  };

  const performChange = e => {
    e.preventDefault();
    props.onCodeWriting(e);
  };
  console.log(props.isLoading);
  return (
    <div>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <div className='form-container'>
          <h2 className='title'> Insert WarcraftLogs report code</h2>
          <form className='mainForm' onSubmit={performSubmit}>
            <input type='text' onChange={performChange} />
            <button className='buttonMain'>Analyze!</button>
          </form>
        </div>
      )}
    </div>
  );
};
