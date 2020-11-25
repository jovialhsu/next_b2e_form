import * as actionTypes from '../constants';

import { all, takeLatest } from 'redux-saga/effects';

import * as OrderRecDetailSaga from './OrderRecDetailSaga';

function* rootSaga() {
    yield all([
        // Order Receive Detail
        takeLatest(
            actionTypes.FETCH_REC_DETAIL_PRODLIST,
            OrderRecDetailSaga.fetchRecDetailProdList
        ),
        takeLatest(
            actionTypes.POST_REC_DETAIL_DATA,
            OrderRecDetailSaga.postRecDetailData
        ),
    ]);
}

export default rootSaga;
