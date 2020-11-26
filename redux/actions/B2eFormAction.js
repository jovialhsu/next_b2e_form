import * as actionTypes from '../constants';
export const resetB2eMemResult = () => ({
    type: actionTypes.RESET_B2E_MEM_DATA,
});

export const addB2eMemData = (member) => ({
    type: actionTypes.ADD_B2E_MEM_DATA,
    member,
});
