// Contains the elements for the Presenter, including:
  // TitleBar
    //  Is passed date from PresenterView props, lectureId from props, and
  // Slides
  // Timer
  // Menu of yet to be built modules
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
import Sidebar from './Sidebar';
import LogoutButton from './LogoutButton';
import TitleBar from './TitleBar';
import QuestionBox from './QuestionBox';
import PresThumbs from './PresThumbs';
import store from '../store.jsx';
import Navbar from './Navbar';

class PresenterView extends Component {
  constructor (props) {
    super(props);
    this.date = new Date();
    this.state = {
      audience: 0
    };
  }

  componentDidMount () {
    let socket = this.props.activeLecture.socket;
    socket.on('presentationInfoRequest', function () {
      let lectureState = store.getState();
      let presentationUrl = lectureState.activeLecture.embedUrl;
      let presentationName = lectureState.activeLecture.name;
      let presentationId = lectureState.activeLecture.presentationId;
      let questions = lectureState.questions;
      let thumbs = lectureState.thumbs;
      let feedbackEnabled = lectureState.feedbackButton.displayed;
    // Listen for audience request for presentation URL
      // response with presentation URL
      socket.emit('presentationInfoResponse',
        presentationUrl, presentationName, presentationId,
        questions, thumbs, feedbackEnabled
      );
    });

    socket.on('connected', () => {
      // Another User has connected
      // Need to increment the audience store
      this.setState({audience: ++this.state.audience});
    });

    // If an audience member has disconnected, update the state
    socket.on('disconnected', () => {
      // A user has left the lecture
      // Need to decrement the audience store (but not past 0)
      if (this.state.audience > 0) {
        this.setState({audience: --this.state.audience});
      }
    });

    socket.on('stopPresentation', function () {
      socket.disconnect();
    });
  };

  render () {
    // <button onClick={this.showStore.bind(this)}></button>
    return (
      <div className = 'presenter-view-container'>
        <Navbar/>
        <div className='container presentation-view'>
          <div className='row'>
            <div className='col-md-9 col-lg-9 pulse-row'>
                <PulseBox startTime={this.date} audience={this.state.audience}/>
                <div id="QuestionBoxPresenter">
                  <QuestionBox role={'presenter'}/>
                </div>
                  <PresThumbs/>
            </div>
            <div className='col-md-3 col-lg-3 sidebar-row'>
              <Sidebar time={this.props.time} duration={this.props.duration} stopTimer={this.props.stopTimer}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
