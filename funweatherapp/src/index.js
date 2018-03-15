import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import App from './App';

//var element = React.createElement('h1', {className: 'Top'}, 'How it feels in your city?');
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
