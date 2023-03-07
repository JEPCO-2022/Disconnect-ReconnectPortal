import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import login from './Login/LoginReducer';
import CustomerReducer from './Customer/CustomerReducer';

// Combine reducers isn't really necessary when you only have one reducer.
// But it's good to have it in case you have multiple reducers.
// And 99.99% of all Redux apps will have more than one reducer.
const reducers = combineReducers({ Login: login, Customer: CustomerReducer });

const store = () => {
  return createStore(reducers, applyMiddleware(thunk));
};

export default store();
