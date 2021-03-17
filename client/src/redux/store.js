import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  stockGainersReducer,
  stockLosersReducer,
  stockDetailsReducer,
  stockNewsReducer,
} from './reducers/stockReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
  stockGainers: stockGainersReducer,
  stockLosers: stockLosersReducer,
  stockDetails: stockDetailsReducer,
  stockNews: stockNewsReducer,
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
