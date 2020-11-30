/**
 * 檢核是否空白
 * @param {string} val
 */
export function isEmpty(val) {
    return val.trim().length === 0
}
/**
 * 檢核 e-mail
 * @param {string} email
 */
export const isEmailErr = email => {
    const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    if (!regExp.test(email)) {
        return false
    }
    return true
}
/**檢核行動電話是否有效(本國) */
export const isMobileErr = mobile => {
    const regExp = /^[09]{2}[0-9]{8}$/
    if (!regExp.test(mobile)) {
        return false
    }
    return true
}

/**
 * 檢核是否為數字
 * @param {number} number
 * @param {string} errMsg - 要顯示的錯誤訊息
 */
export const isNumberErr = number => {
    if (isNaN(number)) {
        return false
    }
    return true
}
/**
 * 檢核 中文姓名 格式:只接受1~10中文字或1~30個英文字母 && 只接受全英或全中
 * @param {string} name1
 * @param {string} name2
 * @param {string} labelName
 * @param {boolean} useStrict 嚴格檢核:只接受中文
 */
export const isCnNameErr = (name1, name2, labelName, useStrict = false) => {
    const cnRegExp = /^[\u4E00-\u9FA5]{1,10}$/
    const enRegExp = /^[a-zA-Z]{1,30}$/
    const errMsg = `請確認 ${labelName || '中文姓名'}${useStrict ? '' : '(只接受1~10中文字或1~30個英文字母)'}`
    if (cnRegExp.test(name1) && cnRegExp.test(name2)) {
        return false
    } else if (enRegExp.test(name1) && enRegExp.test(name2) && !useStrict) {
        return false
    } else {
        return errMsg
    }
}

/**
 * 檢核公司統編
 * @param {string} id - 公司統編
 */
export const isUniformNumbersErr = id => {
    console.log(id)
    if (!/^[0-9]{1,8}$/.test(id)) {
        return false
    }
    return true
}
export const isTelephoneNumberErr = (areaNumber, telNumber, exNumber) => {
    const isHasAreaNumber = /^[0-9]{2,4}$/.test(areaNumber)
    const isHasTelNumber = /^[0-9]{5,10}$/.test(telNumber)
    const isHasExNumber = /^[0-9]{2,5}$/.test(exNumber)
    if ((areaNumber && !telNumber) || (!areaNumber && telNumber)) {
        return '請確認 聯絡電話'
    }
    if (areaNumber || telNumber) {
        if (!isHasAreaNumber) {
            return '請確認 區碼'
        }
        if (!isHasTelNumber) {
            return '請確認 電話號碼'
        }
    }
    if (exNumber) {
        if (!areaNumber || !telNumber) {
            return '請確認 聯絡電話'
        }
        if (!isHasExNumber) {
            return '請檢查 分機'
        }
    }
    return false
}
