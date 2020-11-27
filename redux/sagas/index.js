import * as actionTypes from '../constants';

import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import * as OrderRecDetailSaga from './OrderRecDetailSaga';
import * as B2eFormSaga from './B2eFormSaga';

function* rootSaga() {
    yield all([
        // Order Receive Detail
        takeEvery(actionTypes.ADD_B2E_MEM_DATA, B2eFormSaga.addB2eMemData),
    ]);
}

export default rootSaga;
