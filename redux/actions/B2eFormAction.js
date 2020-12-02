import * as actionTypes from '../constants';
export const resetB2eMemResult = () => ({
    type: actionTypes.RESET_B2E_MEM_DATA,
});

export const addB2eMemData = (member) => ({
    type: actionTypes.ADD_B2E_MEM_DATA,
    member,
});
export const getHeader = () => ({
    type: actionTypes.GET_HEADER,
});
export const getFooter = () => ({
    type: actionTypes.GET_FOOTER,
});
export const fetchHeader = (header) => ({
    type: actionTypes.FETCH_HEADER,
    header,
});
export const fetchFooter = (footer) => ({
    type: actionTypes.FETCH_FOOTER,
    footer,
});
