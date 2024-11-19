import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './UI/signup';
import Signin from './UI/signin';
import Dashboard from './UI/dashboard';
//import Policies from './UI/PolicyList';
import PoliciesPage from './UI/PoliciesPage';
import AddPolicyPage from './UI/AddPolicyForm';
import Home from './UI/home';
import Layout from './UI/Layout';
//import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* <Route path="/Policies" element={<PoliciesPage />} /> */}
          <Route index element={<PoliciesPage />} />
          <Route path="/add-policy" element={<AddPolicyPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Wrap all routes with Layout */}

//         <Route path="/" element={<Layout children={undefined} />}>
//           <Route path="/" element={<PoliciesPage />} />
//           <Route path="/add-policy" element={<AddPolicyPage />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

export default App;

