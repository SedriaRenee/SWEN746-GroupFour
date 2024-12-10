import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { ThemeContextProvider } from "./context/ThemeContext";
import SetProfilePage from './components/SetProfilePage';
import NewsfeedPage from './pages/NewsfeedPage'; 
import Profile from './components/Profile'; 
import GroupPage from './components/GroupsPage';
import WorkshopsPage from './components/WorkshopPage';
import ChannelsPage from './components/ChannelsPage';
import RentalsPage from './components/RentalsPage';
// import EventPage from './components/EventsPage';
const App = () => {
  return (
    <Router>
      <ThemeContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/edit" element={<SetProfilePage />} />
          <Route path="/" element={<NewsfeedPage />} /> 
          <Route path="/profile/:username" element={<Profile />} />

          {/* <Route path="/events" element={<EventPage />} />   */}
          <Route path="/groups" element={<GroupPage />} /> 
          <Route path="/rentals" element={<RentalsPage/>} /> 
          <Route path="/workshops" element={<WorkshopsPage/>} /> 
          <Route path="/channels" element={<ChannelsPage />} /> 

         

        </Routes>
      </ThemeContextProvider>
    </Router>
  );
};

export default App;
