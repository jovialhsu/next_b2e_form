import React from 'react'
import Application from '../public/images/icon-application-success.svg'
import Button from './UI/Button'

const Notification = () => {
    return (
        <div className="content single">
            <div className="application">
                <Application alt="application-success" />
                <h2>申請已送出</h2>
                <p>感謝您撥冗填寫資料，服務專員將盡速與您聯繫，謝謝。</p>
                <Button
                    label="回首頁"
                    onClick={() => {
                        window.location.href = 'https://www.eztravel.com.tw/'
                    }}
                />
            </div>
        </div>
    )
}

export default Notification
