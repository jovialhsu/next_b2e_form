import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { metaRecDetail } from '../config/meta';
import Layout from '../components/layout';
import RecDetail from '../containers/RecDetail';
import * as OrderRecDetailActions from '../redux/actions/OrderRecDetailAction';

const orderRecDetail = () => {
    const dispatch = useDispatch();
    const { decryptOrderNo: orderNo } = useRouter().query;
    //const { compNo } = useSelector((state) => state.LoginReducer.userInfo);
    useEffect(() => {
        if (!orderNo || !compNo) return;
        dispatch(OrderRecDetailActions.fetchRecDetailProdList(orderNo, '123'));
        dispatch(OrderRecDetailActions.updateRecDetailData('orderNo', orderNo));
    }, [orderNo, '123']);
    return (
        <Layout meta={metaRecDetail}>
            <RecDetail />
        </Layout>
    );
};

export default orderRecDetail;
