// Contains the elements for the Presenter, including:
  // Slides
  // Timer
  // PulseBox Component
    // PulseBox is passed a startTime to represent the time at which the presentation is started,
    // which is assumed to be the time that the PresenterView renders

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PulseBox from './PulseBox';
import Slides from './Slides';
import $ from 'jquery';
import '../css/Presentation.css';
import SummaryView from './SummaryView';
import Timer from './Timer';


class PresenterView extends Component {
  constructor () {
    super();
    this.date = new Date();
    this.state = {audience: 0};
  }

  componentDidMount () {
    // If an audience member has connected, update the state
    socket.on('connected', () => {
      this.setState({audience: ++this.state.audience});
    });
    socket.on('disconnected', () => {
      // If an audience member has disconnected, update the state
      if (this.state.audience > 0) {
        this.setState({audience: --this.state.audience});
      }
    });
    $('#stopPresentation').on('click', function () {
      // emit an !audienceOnly event to the server to reset audienceOnly
      socket.emit('!audienceOnly');
    });
  }

  render () {
    // inserted temporary button to test Google Picker functionality
    return (
      <div className = 'presenter-view'>
        <Slides id="presenterSlides" role="presenter"/>
        <Timer/>
        <PulseBox startTime={this.date} audience={this.state.audience}/>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
