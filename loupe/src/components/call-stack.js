import React, { Component } from 'react';
import CSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup';
import EventsMixin from 'react-backbone-events-mixin';

import CallStackItem from './call-stack-item';

export default class CallStack extends Component {
  // mixins: [
  //   EventsMixin
  // ],
  constructor(props) {
    super(props);
    this.state = {
      stack: window.app.store.callstack
    };
  }

  registerListeners(props, state) {
    var self = this;

    this.listenTo(state.stack, 'all', function () {
      self.forceUpdate();
    });
  }

  render() {
    var calls = [];

    this.state.stack.each(function (call) {
      calls.unshift(<CallStackItem key={call._key} isCallback={call.isCallback}>{call.code}</CallStackItem>);
    });

    return (
      <div className="stack-wrapper flexChild">
        <div className="stack">
          <CSSTransitionGroup transitionName="tr-stack">
            {calls}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
};
