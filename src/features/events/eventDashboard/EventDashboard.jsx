import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import { sampleData } from "../../../app/api/sampleData";

export default class EventDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: sampleData,
    };

    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
  }

  handleCreateEvent(event) {
    this.setState(({ events }) => ({
      events: [...events, event],
    }));
    this.props.setFormOpen(false);
  }

  handleUpdateEvent(updatedEvent) {
    this.setState(({ events }) => ({
      events: events.map((evt) =>
        evt.id === updatedEvent.id ? updatedEvent : evt
      ),
    }));
    this.props.selectEvent(null);
    this.props.setFormOpen(false);
  }

  handleDeleteEvent = (eventId) => {
    this.setState(({ events }) => ({
      events: events.filter((evt) => evt.id !== eventId),
    }));
  };

  render() {
    const { selectEvent, setFormOpen, setEvents, selectedEvent, formOpen } =
      this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            events={this.state.events}
            selectEvent={selectEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {formOpen && (
            <EventForm
              setFormOpen={setFormOpen}
              setEvents={setEvents}
              createEvent={this.handleCreateEvent}
              selectedEvent={selectedEvent}
              updateEvent={this.handleUpdateEvent}
              key={selectedEvent ? selectedEvent.id : null}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
