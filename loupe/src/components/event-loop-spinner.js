import React, { Component } from 'react';
import EventsMixin from 'react-backbone-events-mixin';

export default class EventLoopSpinner extends Component {
  // mixins: [
  //   EventsMixin
  // ],
  constructor(props) {
    super(props);
    this.state = {
      code: app.store.code
    };
  }

  registerListeners(props, state) {
    this.listenTo(state.code, 'callback:shifted', function () {
      var domnode = this.refs.spinner.getDOMNode();
      domnode.classList.add('spinner-wrapper-transition');
      var onTransitionEnd = function () {
        domnode.classList.remove('spinner-wrapper-transition');
        domnode.removeEventListener('transitionend', onTransitionEnd, false);
      };
      domnode.addEventListener('transitionend', onTransitionEnd, false);
    }.bind(this));
  }

  render() {
    return (
      <div className="spinner-wrapper" ref='spinner'>
        <div className="spinner-circle" />
        <div className="spinner-arrow spinner-arrow-left" />
        <div className="spinner-arrow spinner-arrow-right" />
      </div>
    );
  }
};
