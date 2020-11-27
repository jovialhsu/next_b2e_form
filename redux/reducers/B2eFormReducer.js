import * as actionTypes from '../constants';

const INITIAL_STATE = {
    memberInfo: {},
};
const B2eFormReducer = (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_B2E_MEM_DATA:
            return Object.assign({}, state.memberInfo, {
                memberInfo: action.member,
            });
        default:
            return state;
    }
};

export default B2eFormReducer;
