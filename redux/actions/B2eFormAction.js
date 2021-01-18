import * as actionTypes from '../constants';

export const resetB2eMemResult = () => ({
    type: actionTypes.RESET_B2E_MEM_DATA,
});
export const requestError = (err) => ({
    type: actionTypes.SENDB2E_REQUEST_FAILED,
    err,
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
export const getEzJsCss = () => ({
    type: actionTypes.GET_EZ_JS_CSS,
});
export const fetchEzJsCss = (EzJsCss) => ({
    type: actionTypes.FETCH_EZ_JS_CSS,
    EzJsCss,
});
