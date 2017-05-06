import React, { Component } from 'react';
import EventMixin from 'react-backbone-events-mixin';

export default class SettingsPanel extends Component {
  // mixins: [EventMixin],
  constructor(props) {
    super(props);
    this.state = {
      code: app.store.code
    };
  }

  registerListeners(props, state) {
    this.listenTo(state.code, 'change:delay', function () {
      this.forceUpdate();
    }.bind(this));
  }

  changeDelay() {
    this.state.code.delay = parseInt(this.refs.delay.getDOMNode().value);
  }

  changeRenders() {
    app.store.code.simulateRenders = this.refs.renders.getDOMNode().checked;
  }

  render() {
    var classes = "flexChild columnParent settingsColumn";
    if (!this.props.open) { classes += " hidden"; }

    return (
      <div className={classes}>
        <div className="setting">
          <label>
            Delay: {this.state.code.delay}ms
            <input type="range" ref="delay" onChange={this.changeDelay} min="0" max="2000" initialValue={this.state.code.delay} />
          </label>
          <label>
            Simulate Renders:
            <input type="checkbox" ref="renders" onChange={this.changeRenders} />
          </label>
        </div>
      </div>
    );
  }
};
