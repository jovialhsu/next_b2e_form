import React from 'react'
//import { ReactComponent as Application } from '../public/images/icon-application-success.svg';
import Application from '../public/images/icon-application-success.svg'
import Button from './UI/Button'
import PropTypes from 'prop-types'

const Notification = () => {
    return (
        <div className="content application">
            <Application alt="application-success" />
            <h2>申請已送出</h2>
            <p>感謝您撥冗填寫資料，服務專員將盡速與您聯繫，謝謝。</p>
            <Button label="回首頁" />
        </div>
    )
}

Notification.propTypes = {}

export default Notification
