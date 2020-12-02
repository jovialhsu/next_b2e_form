import * as actionTypes from '../constants';

const INITIAL_STATE = {
    memberInfo: {},
    footer: '',
    header: '',
};
const B2eFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_B2E_MEM_DATA:
            return Object.assign({}, state.memberInfo, {
                memberInfo: action.member,
            });
        case actionTypes.GET_HEADER:
            return state;
        case actionTypes.GET_FOOTER:
            return state;
        case actionTypes.FETCH_HEADER:
            return { ...state, header: action.payload };
        case actionTypes.FETCH_FOOTER:
            return { ...state, footer: action.payload };
        default:
            return state;
    }
};

export default B2eFormReducer;
