import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {configureStore} from "./redux/store";
import App from './App';
import * as serviceWorker from './serviceWorker';

var theme = 'theme1';
if (localStorage.getItem('selectedTheme')) {
  theme = localStorage.getItem('selectedTheme');
}

const store = configureStore();

const rootEl = document.getElementById('root');

const MainApp = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

let render = () => {
  const css = import('./scss/' + theme + '.scss').then(x => {
    ReactDOM.render(<MainApp/>, rootEl);
  });
};

render();

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
