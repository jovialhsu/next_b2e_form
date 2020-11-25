import * as actionTypes from '../constants';

export const fetchRecDetailProdList = (orderNo, compNo) => ({
    type: actionTypes.FETCH_REC_DETAIL_PRODLIST,
    payload: {
        orderNo,
        compNo,
    },
});
export const fetchRecDetailProdListSuccess = (
    prodList,
    cashEnabled,
    isFinished
) => ({
    type: actionTypes.FETCH_REC_DETAIL_PRODLIST_SUCCESS,
    payload: { prodList, cashEnabled, isFinished },
});

export const updateRecDetailData = (field, value) => ({
    type: actionTypes.UPDATE_REC_DETAIL_DATA,
    payload: {
        field,
        value,
    },
});

export const postRecDetailData = () => ({
    type: actionTypes.POST_REC_DETAIL_DATA,
});

export const resetRecDetailResult = () => ({
    type: actionTypes.RESET_REC_DETAIL_RESULT,
});

export const postRecDetailDataSuccess = (result) => ({
    type: actionTypes.POST_REC_DETAIL_DATA_SUCCESS,
    payload: {
        result,
    },
});
