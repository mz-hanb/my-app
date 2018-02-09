import React, { Component } from 'react';
import Markdown from 'react-markdown';
import debounce from 'lodash.debounce';

// import './App.css';
import './MarkdownStyle.css';


var hasLocalStorage = supportsLocalStorage();
var initialSource = getDefaultSource();

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);    
    this.state = {
      source: initialSource 

    }
}

onChange(e){
  this.setState({source: e.target.value});
  this.storageSource(e.target.value);
}
storageSource(){
  if( hasLocalStorage ){
    debounce(function(src){
      localStorage.markdownSource = src || initialSource;
    }, 250)   
  }else{
    // function(){}
  }
}
  render() {
    return (
      <div>
          {/* Render the markdown component */}
          <div className="app">
          <textarea
            className = "editor"
            defaultValue = {initialSource}
            onChange={this.onChange}
           />
           <Markdown 
              className = "preview"
              escapeHtml={true}              
              source={this.state ? this.state.source : initialSource} 
          />

          </div>
          
          
      </div>
  );
  }
}

function test(){
  alert('///');
}
function supportsLocalStorage() {
  var mod = 'test';
  try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
  } catch (e) {
      return false;
  }
}

function getDefaultSource() {
  return (hasLocalStorage && localStorage.markdownSource) || [
      '# markdown-editor', '',
      'Super simple markdown editor/previewer, based on ',
      '[react-markdown](https://github.com/rexxars/react-markdown)',
      '',
      '**Note: HTML input is disabled in this editor, for now**',
      '',

      '## Flow', '',
      '* When source in the editor is changed:',
      '  * Callback is triggered',
      '  * Updates state on app component',
      '  * App component sets new source on preview component (react-markdown)',
      '  * Changes are reflected!',
      '* As a bonus, a debounced method stores the editor value to localStorage (if available)',
      '',

      '## License', '',
      '* MIT-licensed'
  ].join('\n');
}

export default App;
