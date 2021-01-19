import React from 'react'

function Modal() {
    return (
        <>
            <div className="el-dialog__wrapper ez-dialog">
                <div role="dialog" aria-modal="true" aria-label="連線失敗" className="el-dialog el-dialog--center">
                    <div className="el-dialog__header">
                        <span className="el-dialog__title">連線失敗</span>
                    </div>
                    <div className="el-dialog__body">
                        <span>系統忙碌中，請稍後再試</span>
                    </div>
                    <div className="el-dialog__footer">
                        <span className="dialog-footer">
                            <button type="button" className="el-button prettier-button--primary el-button--primary">
                                <span>確定</span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="0"></div>
        </>
    )
}

export default Modal
