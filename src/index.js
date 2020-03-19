import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const saveState = (state) => {
  try {
    // Convert the state to a JSON string
    const serialisedState = JSON.stringify(state);
    // Save the serialised state to localStorage against the key 'app_state'
    window.localStorage.setItem('app_state', serialisedState);
  } catch (err) {
    // Log errors here, or ignore
  }
};
// console.log(window.localStorage);
const store = createStore(rootReducer);

/**
 * Add a change listener to the store, and invoke our saveState function defined above.
 */
store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
