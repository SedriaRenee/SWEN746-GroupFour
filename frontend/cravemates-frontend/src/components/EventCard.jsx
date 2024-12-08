import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const EventCard = ({ event }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.date} - {event.location}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/events/${event.id}`}>View Event</Button>
        <Button size="small" color="primary">RSVP</Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
