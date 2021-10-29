import React from 'react';
import '../Styles/MainScreen.css';

export const MainScreen = props => {
  const performSubmit = e => {
    e.preventDefault();
    props.onCodeSubmit(e);
  };

  const performChange = e => {
    e.preventDefault();
    props.onCodeWriting(e);
  };

  return (
    <div className='form-container'>
      <h2 className='title'> Insert WarcraftLogs report code</h2>
      <form className='mainForm' onSubmit={performSubmit}>
        <input type='text' onChange={performChange} />
        <button className='buttonMain'>Analyze!</button>
      </form>
    </div>
  );
};
