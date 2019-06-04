import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import appReducer from './redux/reducers/appReducer';
import { Provider } from 'react-redux';

const store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENTIONS__ && window.__REDUX_DEVTOOLS_EXTENTIONS__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
