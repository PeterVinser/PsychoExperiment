import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Quiz from './components/quiz/Quiz';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Registration/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
