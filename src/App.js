import './App.css';
import React, {useEffect} from 'react';
import LandingPage from './pages/LandingPage';
import { Routes , Route } from 'react-router-dom';
import alldata from './components/SampleData.json';

function App() {
  const firstFunc = async() => {
    localStorage.setItem('data', JSON.stringify(alldata));
  }
  useEffect(() => {
    firstFunc();
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
