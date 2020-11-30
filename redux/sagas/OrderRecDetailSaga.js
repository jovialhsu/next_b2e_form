// import { call, put, select } from 'redux-saga/effects';
// import axios from 'axios';
// import { order as orderAPI } from '../../config/uri/client';
// //import * as CommonActions from '../actions/CommonActions';
// import * as OrderRecDetailActions from '../actions/OrderRecDetailAction';

// export function* fetchRecDetailProdList({ payload }) {
//     yield put(CommonActions.isLoading(true));
//     let orderList = [];
//     let newCashEnabled = true;
//     let isFinished = false;
//     const state = yield select();
//     const { cashEnabled } = state.OrderRecDetailReducer;
//     try {
//         console.log(payload);
//         const { orderNo, compNo } = payload;
//         const { data } = yield call(axios.post, orderAPI.orderlist, {
//             orderNo,
//             compNo,
//         });
//         orderList = [...data.orderList];
//         newCashEnabled = data.orderList.some((order) => order.cashEnabled);
//         if (newCashEnabled !== cashEnabled) isFinished = true;
//     } catch (error) {
//         if (!error.response.data.status) {
//             console.log(error.response);
//             return;
//         }
//         const messages = error.response.data.errors
//             .map((error) => error.message)
//             .join('\r\n');
//         console.log(messages);
//     } finally {
//         yield put(
//             OrderRecDetailActions.fetchRecDetailProdListSuccess(
//                 orderList,
//                 newCashEnabled,
//                 isFinished
//             )
//         );
//     }
//     yield put(CommonActions.isLoading(false));
// }

// export function* postRecDetailData() {
//     yield put(CommonActions.isLoading(true));
//     const state = yield select();
//     const { apiData } = state.OrderRecDetailReducer;
//     //const { compNo } = state.LoginReducer.userInfo;
//     let newResult = {
//         message: '',
//         result: '',
//         chargeNo: '',
//         applyNo: '',
//     };
//     try {
//         const { data } = yield call(axios.post, orderAPI.doCashRecSheet, {
//             payload: apiData,
//         });
//         const { message, result, chargeNo, applyNo } = data;
//         newResult = {
//             message,
//             result,
//             chargeNo: chargeNo ?? '',
//             applyNo: applyNo ?? '',
//         };
//     } catch (error) {
//         if (!error.response.data.status) {
//             console.log(error.response);
//             return;
//         }
//         const messages = error.response.data.errors
//             .map((error) => error.message)
//             .join('\r\n');
//         console.log(messages);
//     } finally {
//         yield put(OrderRecDetailActions.postRecDetailDataSuccess(newResult));
//         if (newResult.result === 'true') {
//             console.log(apiData.orderNo);
//             yield put(
//                 OrderRecDetailActions.fetchRecDetailProdList(
//                     apiData.orderNo,
//                     '123'
//                 )
//             );
//         }
//     }
//     yield put(CommonActions.isLoading(false));
// }
