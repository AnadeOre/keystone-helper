import React, { useState } from 'react';
import '../Styles/MainScreen.css';
import { useNavigate } from 'react-router-dom';

export const MainScreen = ({ setDataRecieved }) => {
  //  const { handleChange, handleSubmit } = props;
  //const { handleChange } = props;

  const [link, setLink] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setLink(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    let code;
    if (link.length > 16) {
      code = link.substring(link.length - 16);
    } else {
      code = link;
    }
    fetch(`http://localhost:3001/api/${code}`)
      .then(res => res.json())
      .then(data => {
        setDataRecieved(data);
        navigate(`/report/${code}`);
      });
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label> Insert WarcraftLogs report code: </label>
        <input name='user' type='text' onChange={handleChange} />
        <button type='submit'>Analyze!</button>
      </form>
    </div>
  );
};
