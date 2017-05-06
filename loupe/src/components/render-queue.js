import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import EventsMixin from 'react-backbone-events-mixin';

import Callback from './callback';

export default class RenderQueue extends Component {
  // mixins: [
  //   EventsMixin
  // ],
  constructor(props) {
    super(props);
    this.state = {
      queue: app.store.renderQueue
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
        <Callback state={callback.state} state={callback.state} key={callback.id}>
          {callback.id}
        </Callback>
      );
    });

    return (
      <div className="callback-queue render-queue flexChild">
        {queue}
      </div>
    )
  }
};
