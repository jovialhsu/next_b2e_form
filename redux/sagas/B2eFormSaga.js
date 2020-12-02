import { call, put, select, race, delay } from 'redux-saga/effects';
import axios from 'axios';
import { mainApi as mainWebAPI } from '../../config/uri/client';
import * as B2eFormAction from '../actions/B2eFormAction';

// postOrderMessage
export function* addB2eMemData({ member }) {
    //const state = yield select();

    //const memberInfo = state.B2eFormReducer.memberInfo;
    //console.log(member);
    try {
        const { timeout } = yield race({
            sendMessage: call(sendB2eMemberInfo, member),
            timeout: delay(30 * 1000),
        });
        // if (timeout) {
        //   yield put(
        //     CommonActions.error({
        //       msg: '訊息發送未完成或失敗，請稍後確認往來訊息',
        //       buttons: [{ text: '確認' }],
        //     })
        //   )
        // }
        //return
    } catch (error) {
        console.log(error);
    }
}
export function* getHeader() {
    //const state = yield select();
    try {
        const payload = yield call(fetchHeader);
        yield put({ type: 'FETCH_HEADER', payload });
    } catch (error) {
        console.log(error);
    }
}
export function* getFooter() {
    //const state = yield select();
    try {
        const payload = yield call(fetchFooter);
        yield put({ type: 'FETCH_FOOTER', payload });
    } catch (error) {
        console.log(error);
    }
}
/**
 * @description sendB2eMemberInfo
 * 01 - 內部訊息 (E-mail) 預設E-mail
 * 02 - 外部訊息 (E-mail)
 */

function* sendB2eMemberInfo(member) {
    try {
        const { data } = yield call(
            axios.post,
            'http://localhost:3000/member',
            member
        );
        //yield put(OrderDetailActions.postMessageStatus(data.status))
        if (data.status == 200) {
            //yield put(B2eFormAction.addB2eMemData({ company: '', tel: '' }))
            //yield put(B2eFormAction.updateOrderMessage({ type: '', bodyText: '' }))
        }
        return;
    } catch (error) {
        console.log(error);
    }
}
function* fetchHeader() {
    try {
        const { data } = yield call(axios.get, mainWebAPI.header);
        return data;
    } catch (error) {
        console.log(error);
    }
}
function* fetchFooter() {
    try {
        const { data } = yield call(axios.get, mainWebAPI.footer);
        return data;
    } catch (error) {
        console.log(error);
    }
}
