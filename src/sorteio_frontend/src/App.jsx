import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import Sorteio from './sorteio';
import Individual from './individual';

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />        
        <Route path="/sorteio/" element={<Sorteio/>} /> 
        <Route path="/individual/" element={<Individual/>} /> 
        <Route path="*" element={<h1>Not Found</h1>} />        
      </Routes>
    </Router>

  );
}


export default App;
