import React, { Component } from 'react';

export default class CallStackItem extends Component {
  render() {
    var classes = "stack-item";
    if (this.props.isCallback) {
      classes += " stack-item-callback";
    }

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
};
