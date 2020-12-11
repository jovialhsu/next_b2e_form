import { call, put, select, race, delay } from 'redux-saga/effects';
import axios from 'axios';
import { mainApi as mainWebAPI, b2e as b2eApi } from '../../config/uri/client';
import * as B2eFormAction from '../actions/B2eFormAction';

// postOrderMessage
export function* addB2eMemData({ member }) {
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
    try {
        const payload = yield call(fetchHeader);
        yield put({ type: 'FETCH_HEADER', payload });
    } catch (error) {
        console.log(error);
    }
}
export function* getFooter() {
    try {
        const payload = yield call(fetchFooter);
        yield put({ type: 'FETCH_FOOTER', payload });
    } catch (error) {
        console.log(error);
    }
}
export function* getEzJsCss() {
    try {
        const payload = yield call(fetchEzJsCss);
        yield put({ type: 'FETCH_EZ_JS_CSS', payload });
    } catch (error) {
        console.log(error);
    }
}
/**
 * @description sendB2eMemberInfo
 * @param member 申請資料
 */

function* sendB2eMemberInfo(member) {
    try {
        yield call(axios.post, b2eApi.member, member);
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
function* fetchEzJsCss() {
    try {
        const { data } = yield call(axios.get, mainWebAPI.EzJsCss);
        return data;
    } catch (error) {
        console.log(error);
    }
}
