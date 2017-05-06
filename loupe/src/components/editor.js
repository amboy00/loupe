import React, { Component } from 'react';
import EventMixin from 'react-backbone-events-mixin';
import AceEditor from './ace-editor';

export default class Editor extends Component {
  // mixins: [
  //   EventMixin
  // ],
  constructor(props) {
    super(props);
    this.state = {
      code: app.store.code,
      editing: true
    };
  }

  registerListeners(props, state) {
    var self = this;

    this.listenTo(state.code, 'change', function () {
      this.forceUpdate();
    }.bind(this));

    this.listenTo(state.code, 'node:will-run', function (id) {
      var node = self.refs.code.getDOMNode().querySelector('#node-' + id);
      node.classList.add('running');
    });

    this.listenTo(state.code, 'node:did-run', function (id) {
      var node = self.refs.code.getDOMNode().querySelector('#node-' + id);
      node.classList.remove('running');
    });
  }

  onCodeChange(newCode) {
    this.state.code.codeLines = newCode;
  }

  onEditBlur() {
    this.setState({ editing: false });
    //var newCode = this.refs.code.getDOMNode().innerText;
    //this.state.code.html = newCode;
    //this.setState({ editing: false });
  }

  saveAndRunCode() {
    this.setState({ editing: false });
    this.runCode();
  }

  runCode() {
    this.state.code.run();
  }

  pauseCode() {
    this.state.code.pause();
  }

  resumeCode() {
    this.state.code.resume();
  }

  onEditFocus() {
    this.state.code.resetEverything();
    this.setState({ editing: true });
  }

  render() {
    if (this.state.editing) {
      return (
        <div className="flexChild columnParent">
          <div className='editor-switch'>
            <button onClick={this.saveAndRunCode}>Save + Run</button>
          </div>
          <AceEditor
            mode="javascript"
            //onBlur={this.onEditBlur}
            onCodeChange={this.onCodeChange}
            initialValue={this.state.code.rawCode}
          />
        </div>
      );
    } else {
        var i = 0;
        var lines = this.state.code.codeLines.map(function () { i++; return i; }).join(String.fromCharCode(10));

        return (
          <div className="flexChild columnParent">
            <div className='editor-switch'>
              <button onClick={this.onEditFocus}>Edit</button>
              <button onClick={this.runCode}>Rerun</button>
              <button onClick={this.pauseCode}>Pause</button>
              <button onClick={this.resumeCode}>Resume</button>
            </div>
            <div
              className="editor flexChild"
              dangerouslySetInnerHTML={ {__html: this.state.code.wrappedHtml} }
              onClick={this.onEditFocus}
              ref="code"
              data-lines={lines}
            />
          </div>
        );
    }
  }
};
