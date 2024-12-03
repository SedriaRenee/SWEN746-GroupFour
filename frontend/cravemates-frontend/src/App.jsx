import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import EditProfilePage from './components/EditProfilePage';
import HomePage from './components/Homepage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        {/* <Route path="/main" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
