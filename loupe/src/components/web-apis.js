import React, { Component } from 'react';
import WebApiTimer from './web-api-timer';
import WebApiQuery from './web-api-query';
import EventMixin from 'react-backbone-events-mixin';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class WebApis extends Component {
  // const mixins = [
  //   EventMixin
  // ]
  constructor(props) {
    super(props);
    this.state = {
      apis: app.store.apis
    };
  }


  registerListeners(props, state) {
    this.listenTo(state.apis, 'all', function () {
      this.forceUpdate();
    }.bind(this));

    this.listenTo(state.apis, 'callback:spawned', function (model) {
      this.refs[model.id].flash();
    }.bind(this));
  }

  render () {
    var apis = this.state.apis.map( (api) => {
      if (api.type === 'timeout') {
        return <WebApiTimer timeout={api.timeoutString} key={api.id} ref={api.id} playState={api.playState}>{api.code}</WebApiTimer>;
      }
      if (api.type === 'query') {
        return (
            <WebApiQuery key={api.id} ref={api.id}>
              {api.code}
            </WebApiQuery>
          );
        }
      }
    );

    return (
      <div className='webapis flexChild'>
        <CSSTransitionGroup transitionName="tr-webapis">
          {apis}
        </CSSTransitionGroup>
      </div>
    );
  }
};
