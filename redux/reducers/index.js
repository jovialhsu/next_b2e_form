import { combineReducers } from 'redux';
import OrderRecDetailReducer from './OrderRecDetailReducer';
import B2eFormReducer from './B2eFormReducer';
// const initialState = {
//     articles: [],
// };

export default combineReducers({
    OrderRecDetailReducer,
    B2eFormReducer,
});
