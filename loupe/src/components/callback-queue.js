import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Callback from './callback';
import EventsMixin from 'react-backbone-events-mixin';

export default class CallbackQueue extends Component {
  // mixins: [
  //   EventsMixin
  // ],
  constructor(props) {
    super(props);
    this.state = {
      queue: app.store.queue
    };
  }

  registerListeners(props, state) {
    this.listenTo(state.queue, 'all', function () {
      this.forceUpdate();
    }.bind(this));
  }

  render() {
    var queue = this.state.queue.map(function (callback) {
      return (
        <Callback state={callback.state} key={callback.id}>
          {callback.code}
        </Callback>
      );
    });

    return (
      <div className="callback-queue flexChild">
        <CSSTransitionGroup transitionName="tr-queue">
          {queue}
        </CSSTransitionGroup>
      </div>
    )
  }
};
