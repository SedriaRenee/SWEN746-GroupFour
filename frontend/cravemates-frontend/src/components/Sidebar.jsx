import { useState } from 'react';
import '../css/signup.css'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidebar}>Toggle</button>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li>
          <button>
            Events
            <ul>
              <li><Link to="/events">All Events</Link></li>
              <li><Link to="/events/attending">Your Events</Link></li>
              <li><Link to="/events/archived">Archived Events</Link></li>
            </ul>
          </button>
        </li>
        <li>
          <button>
            Groups
            <ul>
              <li><Link to="/groups">All Groups</Link></li>
              <li><Link to="/groups/your-groups">Your Groups</Link></li>
            </ul>
          </button>
        </li>
        <li>
          <button>
            Channels
            <ul>
              <li><Link to="/channels">All Channels</Link></li>
              <li><Link to="/channels/followed">Channels You Follow</Link></li>
            </ul>
          </button>
        </li>
        <li>
          <button>
            Workshops
            <ul>
              <li><Link to="/workshops">All Workshops</Link></li>
              <li><Link to="/workshops/attending">Attending Workshops</Link></li>
              <li><Link to="/workshops/archived">Archived Workshops</Link></li>
            </ul>
          </button>
        </li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

