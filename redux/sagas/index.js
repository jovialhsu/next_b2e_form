import * as actionTypes from '../constants';
import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import * as B2eFormSaga from './B2eFormSaga';

function* rootSaga() {
    yield all([
        takeEvery(actionTypes.ADD_B2E_MEM_DATA, B2eFormSaga.addB2eMemData),
        takeEvery(actionTypes.GET_HEADER, B2eFormSaga.getHeader),
        takeEvery(actionTypes.GET_FOOTER, B2eFormSaga.getFooter),
        // takeEvery(actionTypes.FETCH_HEADER, B2eFormSaga.getHeadFootAction),
    ]);
}

export default rootSaga;
