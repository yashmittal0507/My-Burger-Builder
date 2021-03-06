import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const composeEnchancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; //preventing redux store view in redux extenstion during production
const rootReducer = combineReducers({
    burgerBuilder:burgerReducer,
    order:orderReducer,
    auth:authReducer
})
const store =createStore(rootReducer,composeEnchancers(
    applyMiddleware(thunk)
));

const app =(
    <Provider store={store}>
    <BrowserRouter>
        
             <App/>
        
    </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
