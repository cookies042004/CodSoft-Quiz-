// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import PlayInstructions from './Components/quiz/Play-instructions';
import Play from './Components/quiz/Play';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import CreateQuiz from './Components/CreateQuiz';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/Play/instructions' exact element={<PlayInstructions />} />
        <Route path='/Play/quiz' exact element={<Play />} />
        <Route path='/login' exact element={<Login />} /> 
        <Route path='/Signup' exact element={<Signup />} /> 
        <Route path='/create-quiz' exact element={<CreateQuiz />} /> 
      </Routes>
    </Router>
  );
}

export default App;
