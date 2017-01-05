import React, { Component } from 'react';
import '../css/SummaryView.css';
import SummaryLeftPane from './SummaryLeftPane';
import SummaryMainPane from './SummaryMainPane';
import getLectureSummary from '../util/getLectureSummary';
import { connect } from 'react-redux';

// View to display summary data about the presentation and users
class SummaryView extends Component {
  componentWillMount () {
    let lectureId = 'cc0001';// temporary lectureId

    // once this component loads, it gets the summary from the server and store it to the store
    getLectureSummary(lectureId, (summary) => {
      this.props.dispatch({
        type: 'UPDATE_SUMMARY',
        summary: summary
      });
    });
  }

  render () {
    // test for displaying summary
    console.log('summary', this.props.summary);
    return (
      <div>
        <h1>Summary</h1>
        <SummaryLeftPane/>
        <SummaryMainPane/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    summary: state.summary,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(SummaryView);
