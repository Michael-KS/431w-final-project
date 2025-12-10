import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';


import AdminLandingPage from './pages/AdminLandingPage';
import UserLoginPage from './pages/UserLoginPage';

const HomePage = () => {
  return(
    <div>
      <h2>Welcome to Outing!</h2>
      <div>
        <Link to ="/admin-landing-page">
        <button>Login As Admin</button>
        </Link>
        <Link to ="/user-login-page">
        <button>Login As User</button>
        </Link>
      </div>
    </div>
  );
  
};

function App() {
  const location = useLocation();
  return (
    <>
      <nav>
        <ul>
          {location.pathname !== '/' && (
            <li>
            <Link to="/">Go Home</Link>
            </li>
          )}
          
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-landing-page" element={<AdminLandingPage />} />
        <Route path="/user-login-page" element={<UserLoginPage />} />
      </Routes>
    </>
  );
}

export default App;
