import * as actionTypes from '../constants';
export const resetB2eMemResult = () => ({
    type: actionTypes.RESET_B2E_MEM_DATA,
});

export const addB2eMemData = (result) => ({
    type: actionTypes.ADD_B2E_MEM_DATA,
    payload: {
        result,
    },
});
