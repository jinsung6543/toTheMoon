import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  stockGainersReducer,
  stockLosersReducer,
  stockDetailsReducer,
  stockNewsReducer,
} from './reducers/stockReducers';

const reducer = combineReducers({
  stockGainers: stockGainersReducer,
  stockLosers: stockLosersReducer,
  stockDetails: stockDetailsReducer,
  stockNews: stockNewsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
