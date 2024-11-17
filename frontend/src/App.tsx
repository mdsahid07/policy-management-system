import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './UI/home';
import Signup from './UI/signup';
import Signin from './UI/signin';
import Dashboard from './UI/dashboard';
//import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

