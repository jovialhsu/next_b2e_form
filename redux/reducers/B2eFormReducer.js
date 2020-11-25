import * as actionTypes from '../constants';

const INITIAL_STATE = {
    COMP_NAME: '', //公司名稱*
    COMP_NAME_VALID: true,

    COMP_UNI_ID: '', //統一編號*
    COMP_UNI_ID_VALID: true,
    COMP_UNI_ID_MSG: '請輸入統一編號',

    TEL_VALID: true,
    TEL: '', //公司電話*
    TEL_AREA: '', //公司區碼
    TEL_EXT: '', //公司分機

    COMP_EMPOLYEE: '', //員工人數
    COMP_EMPOLYEE_VALID: true,
    COMP_EMPOLYEE_MSG: '請輸入員工人數',
    COMP_SCALE: '', //公司規模

    ADDR_CONT: '', //聯絡地址
    ADDR_CONT_COUNTY: '',
    ADDR_CONT_DISTRICT: '',
    ZIP_CONT: '', //郵遞區號
    ADDR_CONT_VALID: true, //聯絡地址
    DEALER_TYPE: '', //產業類別
    COMP_AMOUNT: '', //資本額
    COMP_AMOUNT_VALID: true, //驗證是否為輸入數字??100000000
    ///
    CONT_NAME: '', //聯絡人姓名
    CONT_NAME_FIRST: '', //聯絡人名
    CONT_NAME_LAST: '', //聯絡人姓
    CONT_NAME_VALID: true,

    CONT_TEL_EXT: '', //聯絡人電話(區碼+電話+分機)
    CONT_TEL: '',
    CONT_TEL_AREA: '',
    CONT_TEL_VALID: true,

    CONT_EMAIL: '', //聯絡人電子信箱
    CONT_EMAIL_VALID: true,
    CONT_EMAIL_MSG: '請輸入電子信箱',

    CONT_TEL_MO: '', //聯絡人手機
    CONT_TEL_MO_VALID: true,
    CONT_TEL_MO_MSG: '請輸入聯絡人手機',
    ///
    COMP_NEED: '', //配合方式
    COMP_NEED_VALID: true,
    B2E_OTHER: '', //其他
    COMP_TOUR_AGENCY: '', //配合旅行社
    COMP_PAY_CHOICE: '', //付款方式
    COMP_PAY_CHOICE_VALID: true,
    MONEY_BY_PEOPLE: '', //每人補助金額
    controlType: null,
    id: '',
    label: '',
    rows: null,
    validityMessage: '',
};

function rootReducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case actionTypes.FETCH_REC_DETAIL_PRODLIST:
        case actionTypes.POST_REC_DETAIL_DATA: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case actionTypes.FETCH_REC_DETAIL_PRODLIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                prodList: payload.prodList,
                cashEnabled: payload.cashEnabled,
                isFinished: payload.isFinished,
            };
        }
        case actionTypes.UPDATE_REC_DETAIL_DATA: {
            return {
                ...state,
                apiData: {
                    ...state.apiData,
                    [payload.field]: payload.value,
                },
            };
        }
        case actionTypes.POST_REC_DETAIL_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                result: {
                    ...state.result,
                    ...payload.result,
                },
            };
        }
        case actionTypes.RESET_REC_DETAIL_RESULT: {
            return {
                ...state,
                result: {
                    message: '',
                    result: '',
                    chargeNo: '',
                    applyNo: '',
                },
            };
        }
        default:
            return state;
    }
}
export default rootReducer;
