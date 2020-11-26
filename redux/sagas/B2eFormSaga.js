import { call, put, select, race, delay } from 'redux-saga/effects';
import axios from 'axios';
import { order as orderAPI } from '../../config/uri/client';
//import * as CommonActions from '../actions/CommonActions';
import * as OrderRecDetailActions from '../actions/OrderRecDetailAction';
import * as B2eFormAction from '../actions/B2eFormAction';

// postOrderMessage
export function* addB2eMemData({ member }) {
    //yield put(CommonActions.isLoading(true));
    const state = yield select();
    console.log(state.B2eFormReducer);
    const { memberInfo } = state.B2eFormReducer;
    // const { p, q } = o;
    // const o = { p: 42, q: true };
    //const state.B2eFormReducer={memberInfo:value}
    try {
        const { timeout } = yield race({
            sendMessage: call(sendMessageAction, member, memberInfo),
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
    //finally {
    //yield call(fetchOrderMessage, { orderNo })
    //yield put(CommonActions.isLoading(false))
    //}
}

/**
 * @description send Message type
 * 01 - 內部訊息 (E-mail) 預設E-mail
 * 02 - 外部訊息 (E-mail)
 * 03 - 外部訊息 (簡訊)
 * 04 - 外部訊息 (E-mail+簡訊) 簡訊忽略附件
 * 05 - 訂單備註
 */

function* sendMessageAction(member, memberInfo) {
    const { company, tel } = memberInfo;

    try {
        const { data } = yield call(
            axios.post,
            'http://localhost:3000/member',
            memberInfo
        );
        //yield put(OrderDetailActions.postMessageStatus(data.status))
        if (data.status == 200) {
            console.log('連線成功?');
            //yield put(B2eFormAction.addB2eMemData({ company: '', tel: '' }))
            //yield put(B2eFormAction.updateOrderMessage({ type: '', bodyText: '' }))
        }

        return;
    } catch (error) {
        console.log(error);
    }
}
