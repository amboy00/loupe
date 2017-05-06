import React, { Component } from 'react';
import ace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/theme/solarized_light';


export default class AceEditorComponet extends Component {
  getDefaultProps() {
    return {
      mode: 'javascript',
      initialValue: '',
      onBlur: function () { },
      onCodeChange: function (newCode) {
        console.log('Code changed to', newCode);
      }
    };
  }

  // componentDidMount() {
  //   this.editor = ace.edit(this.findDOMNode());
  //   this.editSession = this.editor.getSession();

  //   this.editor.getSession().setMode('ace/mode/' + this.props.mode);
  //   this.editor.setTheme('ace/theme/solarized_light');

  //   this.editor.focus();
  //   this.editor.setValue(this.props.initialValue, -1);

  //   this.editor.on('blur', function () {
  //     this.props.onCodeChange(this.editor.getValue().split('\n'));
  //     this.props.onBlur();
  //   }.bind(this));
  // }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    return (
      <div className="ace-editor-wrapper">
        <AceEditor
          mode="javascript"
          theme="solarized_light"
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
    </div>
    );
  }
};
