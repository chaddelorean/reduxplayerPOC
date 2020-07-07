import { createStore } from 'redux';
import { timelineReducer, apJSReducers } from '../reducers/index.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({ realtime: true });
const timelineStore = createStore(timelineReducer, composeEnhancers());
const apjsStore = createStore(apJSReducers, composeEnhancers());

export {
    timelineStore,
    apjsStore
}