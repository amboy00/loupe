import React, { Component } from 'react';

export default class Callback extends Component {
  render() {
    var classes = ["callback", "callback-" + this.props.state].join(' ');
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
};
