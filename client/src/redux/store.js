import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  stockMostActiveReducer,
  stockGainersReducer,
  stockLosersReducer,
  stockDetailsReducer,
  stockNewsReducer,
  stockHoldingReducer,
  stockBuyReducer,
  stockSellReducer,
  stockPortfolioReducer,
  stockOrderListReducer,
  stockChartDataReducer,
} from './reducers/stockReducers';
import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  stockMostActive: stockMostActiveReducer,
  stockGainers: stockGainersReducer,
  stockLosers: stockLosersReducer,
  stockDetails: stockDetailsReducer,
  stockNews: stockNewsReducer,
  stockHolding: stockHoldingReducer,
  stockBuy: stockBuyReducer,
  stockSell: stockSellReducer,
  stockPortfolio: stockPortfolioReducer,
  stockOrderList: stockOrderListReducer,
  stockChartData: stockChartDataReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
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
