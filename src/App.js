import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Quiz from './components/quiz/Quiz';
import Intermission from './components/intermission/Intermission';
import Final from './components/final/Final';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Registration/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/intermission' element={<Intermission/>}/>
          <Route path='/final' element={<Final/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
