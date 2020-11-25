import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux/reducers/OrderRecDetailReducer';
import rootSaga from '../redux/sagas';

// import ip from 'ip'
// import os from 'os'

const bindMiddleware = (middleware) => {
    // if (process.env.NODE_ENV !== 'production') {
    //   const { composeWithDevTools } = require('redux-devtools-extension')
    //   // 前端使用chrome extension 後端用 remote devtool
    //   const composeEnhancers =
    //     (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    //     composeWithDevTools({
    //       name: ip.address() + ' ' + os.hostname(),
    //       port: 8000,
    //     })
    //   return composeEnhancers(applyMiddleware(...middleware))
    // }
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const initialiseSagaMiddleware = createSagaMiddleware();
const sagaMiddleware = createSagaMiddleware();
//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
//initialiseSagaMiddleware.run(rootSaga);
store.sagaTask = sagaMiddleware.run(rootSaga);
// function store(initialState = {}) {
//     const sagaMiddleware = createSagaMiddleware();
//     const store = createStore(
//         rootReducer,
//         initialState,
//         bindMiddleware([sagaMiddleware])
//     );
//     //console.log(store.getState())

//     //store.sagaTask = sagaMiddleware.run(rootSaga);
//     return store;
// }
export default store;
