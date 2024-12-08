import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Collapse, List, ListItem, ListItemText } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import EventCard from '../components/EventCard';  // Assuming you have a Card component for individual events
import axios from 'axios';
import Header from "../components/Header"; // Assuming you have a Header component
import FooterBar from "../components/FooterBar"; // Assuming you have a FooterBar component

const EventPage = () => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sortOption, setSortOption] = useState('date');
  
  // Fetch events based on sort option
  useEffect(() => {
    axios.get(`/events/?sort_by=${sortOption}`)
      .then(response => setEvents(response.data))
      .catch(error => console.log(error));
  }, [sortOption]);

  const handleSidebarToggle = () => setOpenSidebar(!openSidebar);
  
  const handleSortChange = (sortBy) => {
    setSortOption(sortBy);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header />
      
      {/* Main Content Section */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: openSidebar ? 250 : 0,
            transition: 'width 0.3s',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
          }}
        >
          <Button onClick={handleSidebarToggle}>
            {openSidebar ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={openSidebar}>
            <List>
              <ListItem button>
                <ListItemText primary="Create Event" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Events Hosting" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Events Attending" />
              </ListItem>
            </List>
          </Collapse>
        </Box>

        {/* Event Feed Section */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: theme.spacing(3),
            marginLeft: openSidebar ? 250 : 0,
            transition: 'margin-left 0.3s',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Event Feed
          </Typography>

          {/* Sort Options */}
          <Box sx={{ marginBottom: theme.spacing(2) }}>
            <Button variant="outlined" onClick={() => handleSortChange('date')}>Sort by Date</Button>
            <Button variant="outlined" onClick={() => handleSortChange('host_type')}>Sort by Host</Button>
          </Box>

          {/* CSS Grid to display Event Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: theme.spacing(3),
            }}
          >
            {/* Map over events and create a card for each */}
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <FooterBar />
    </Box>
  );
};

export default EventPage;
