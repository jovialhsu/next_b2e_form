import * as actionTypes from '../constants';
import { all, takeEvery } from 'redux-saga/effects';

import * as B2eFormSaga from './B2eFormSaga';

function* rootSaga() {
    yield all([
        takeEvery(actionTypes.ADD_B2E_MEM_DATA, B2eFormSaga.addB2eMemData),
        takeEvery(actionTypes.GET_HEADER, B2eFormSaga.getHeader),
        takeEvery(actionTypes.GET_FOOTER, B2eFormSaga.getFooter),
        takeEvery(actionTypes.GET_EZ_JS_CSS, B2eFormSaga.getEzJsCss),
    ]);
}

export default rootSaga;
