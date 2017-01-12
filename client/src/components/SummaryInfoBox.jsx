import React, { Component } from 'react';
import SummaryInfoBoxDetails from './SummaryInfoBoxDetails';

// this component is meant to display different sets of data about each presentation
  // ex: avg clicks/minute, highest amount of clicks at one time, avg clicks per student, etc
class SummaryInfoBox extends Component {
  constructor () {
    super();
    this.state = {
      showDetails: false
    };
  }
  toggleView (toggle) {
    this.setState({showDetails: toggle});
  }

  render () {
    return (
      <div className='summary-info-box'>
        {
          this.props.thumbs
          ? <div class='thumbs'>
              {Object.keys(this.props.thumbs).map((thumb, i) =>
                  <p className='thumb'key={i}>{thumb}<span>: {this.props.thumbs[thumb]}</span></p>
                )
              }
              <p className='title'><strong>{this.props.title}</strong></p>
            </div>
          : <div>
            {
              this.props.title === 'Max click peak'
              ? <p className='output-md'>{this.props.value || 0}</p>
              : this.props.title === 'Longest time w/o clicks'
              ? <p className='output-sm'>{this.props.value.slice(0, -8)}<span>{this.props.value.slice(-7)}</span></p>
              : <p className='output'>{this.props.value || 0}</p>
            }
            <p className='title'><strong>{this.props.title + '  '}</strong>
            {
              !this.props.viewDetails || !this.props.viewDetails.length ? null
              : <button type="button" className='btn btn-white view-btn' onClick={() => { this.toggleView(true); }}><i className="fa fa-search-plus"></i>View</button>
            }</p>
          </div>
        }

        {
          !this.state.showDetails ? null
          : <SummaryInfoBoxDetails title={this.props.title} details={this.props.viewDetails} toggleView={this.toggleView.bind(this)} />
        }
      </div>
    );
  };
};

export default SummaryInfoBox;
