// import * as actionTypes from '../constants';

// const INITIAL_STATE = {
//     prodList: [],
//     apiData: {
//         orderNo: '',
//         prod: {},
//         rec: { custNm: '', personId: '', remark: '' },
//         sheet: { apply: true, titleId: '', titleNm: '', recManNm: '' },
//     },
//     isLoading: false,
//     result: {
//         message: '',
//         result: '',
//         chargeNo: '',
//         applyNo: '',
//     },
//     cashEnabled: true,
//     isFinished: false,
// };

// function rootReducer(state = INITIAL_STATE, { type, payload }) {
//     switch (type) {
//         case actionTypes.FETCH_REC_DETAIL_PRODLIST:
//         case actionTypes.POST_REC_DETAIL_DATA: {
//             return {
//                 ...state,
//                 isLoading: true,
//             };
//         }
//         case actionTypes.FETCH_REC_DETAIL_PRODLIST_SUCCESS: {
//             return {
//                 ...state,
//                 isLoading: false,
//                 prodList: payload.prodList,
//                 cashEnabled: payload.cashEnabled,
//                 isFinished: payload.isFinished,
//             };
//         }
//         case actionTypes.UPDATE_REC_DETAIL_DATA: {
//             return {
//                 ...state,
//                 apiData: {
//                     ...state.apiData,
//                     [payload.field]: payload.value,
//                 },
//             };
//         }
//         case actionTypes.POST_REC_DETAIL_DATA_SUCCESS: {
//             return {
//                 ...state,
//                 isLoading: false,
//                 result: {
//                     ...state.result,
//                     ...payload.result,
//                 },
//             };
//         }
//         case actionTypes.RESET_REC_DETAIL_RESULT: {
//             return {
//                 ...state,
//                 result: {
//                     message: '',
//                     result: '',
//                     chargeNo: '',
//                     applyNo: '',
//                 },
//             };
//         }
//         default:
//             return state;
//     }
// }
// export default rootReducer;
