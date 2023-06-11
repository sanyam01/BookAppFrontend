import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState('This is the static data in front end');

  useEffect(() => {
    axios.get('http://localhost:5000/').then(response => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);
  return (
    <div>
      <p>This is the frontend app.</p>
      {data}
    </div>
  );
}

export default App;
