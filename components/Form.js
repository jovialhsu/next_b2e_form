import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { addB2eMemData } from '../redux/actions/B2eFormAction'
import FormHeader from './UI/FormHeader'
import TextInput from './UI/TextInput'
import SelectInput from './UI/SelectInput'
import AddressInput from './UI/AddressInput'
import FormContainer from './UI/FormContainer'
import Button from './UI/Button'
import { isEmpty, isUniformNumbersErr, isEmailErr, isMobileErr, isNumberErr } from './helpers/validation'

function mapDispatchToProps(dispatch) {
    return {
        addB2eMemData: member => dispatch(addB2eMemData(member)),
    }
}
export class Form extends Component {
    constructor(props) {
        super(props)
        this.initialState = {
            apiData: {
                nameChn: '', //公司名稱*
                compUniId: '', //統一編號*
                tel1Ext: '', //公司分機
                headcount: '', //員工人數
                compScale: '',
                addrCont: '', //聯絡地址
                addrContCounty: '',
                addrContDistrict: '',
                zipCont: '', //郵遞區號
                dealerType: '', //產業類別
                capital: '', //資本額
                contName: '', //聯絡人姓名
                contTelExt: '', //聯絡人電話(區碼+電話+分機)
                contTel: '',
                contEmail: '', //聯絡人電子信箱
                contTelMo: '', //聯絡人手機
                collaborateWay: '', //配合方式
                demand: '', //其他
                travelAgency: '', //配合旅行社
                paymentMethod: '', //付款方式
                subsidy: '', //每人補助金額
                tel1: '',
            },
            telArea: '',
            contTelArea: '',
            tel: '',
            nameChnValid: true,
            compUniIdValid: true,
            compUniIdMsg: '請輸入統一編號',
            tel1Valid: true,
            headcountValid: true,
            headcountMsg: '請輸入員工人數',
            addrContValid: true, //聯絡地址
            addrContCountyValid: true,
            addrContDistrictValid: true,
            zipContValid: true,
            capitalValid: true, //驗證是否為輸入數字??100000000
            contNameValid: true,
            contTelValid: true,
            contEmailValid: true,
            contEmailMsg: '請輸入電子信箱',
            contTelMoValid: true,
            contTelMoMsg: '請輸入聯絡人手機',
            collaborateWayValid: true,
            paymentMethodValid: true,
            travelAgencyValid: true,
        }
        this.state = this.initialState
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const { name, value } = event.target ? event.target : event
        const checkNumArr = ['headcount'] //需要驗證為數字name欄位
        //將對應的值寫入apiData
        this.setState({ apiData: { ...this.state.apiData, [name]: value } }, () => {})

        /**
         * 檢查資料正確
         * 不為空值:[nameChn,compUniId,headcount,addrCont,contTel,contEmail,collaborateWay,travelAgency,paymentMethod,contName,tel1]
         * 為數字:[headcount]
         * 為電子郵件格式:[contEmail]
         * 統一編號:[compUniId]
         * 行動電話格式:[contTelMo]
         */
        if (typeof event.target !== 'undefined') {
            const valid = event.target.getAttribute('data-valid')
            console.log(valid)
            !isEmpty(value) ? this.setState({ [valid]: true }) : this.setState({ [valid]: false })
            if (name === 'compUniId') {
                //檢驗統編
                isUniformNumbersErr(value)
                    ? this.setState({ [valid]: isUniformNumbersErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          compUniIdMsg: '請輸入統一編號',
                      })
                    : this.setState({
                          [valid]: isUniformNumbersErr(value),
                          compUniIdMsg: '請確認統一編號格式',
                      })
            }
            if (name === 'contEmail') {
                //檢驗電子信箱
                isEmailErr(value)
                    ? this.setState({ [valid]: isEmailErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          contEmailMsg: '請輸入電子信箱',
                      })
                    : this.setState({
                          [valid]: isEmailErr(value),
                          contEmailMsg: '請確認電子信箱格式',
                      })
            }
            if (name === 'contTelMo') {
                //檢驗行動電話
                isMobileErr(value)
                    ? this.setState({ [valid]: isMobileErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          contTelMoMsg: '請輸入行動電話',
                      })
                    : this.setState({
                          [valid]: isMobileErr(value),
                          contTelMoMsg: '請確認是否為有效行動電話',
                      })
            }
            if (checkNumArr.indexOf(name) > -1) {
                isNumberErr(value) && value !== ''
                    ? this.setState({ [valid]: isNumberErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          headcountMsg: '請輸入員工人數',
                      })
                    : this.setState({
                          [valid]: isNumberErr(value),
                          headcountMsg: '請輸入有效數字',
                      })
            }
        } else {
            const valid = `${event.name}Valid`
            !isEmpty(value) ? this.setState({ [valid]: true }) : this.setState({ [valid]: false })
        }
    }
    handleFormReset = () => {
        this.setState(() => this.initialState)
    }
    handleChangeCounty = props => {
        const { addrContCounty, addrContDistrict, zipCont } = props
        this.setState({
            zipContValid: !isEmpty(zipCont) ? true : false,
            apiData: { ...this.state.apiData, addrContCounty, addrContDistrict, zipCont },
        })
    }
    handleChangeName = props => {
        const { contName, contNameValid } = props
        this.setState({ contNameValid: contNameValid, apiData: { ...this.state.apiData, contName } })
    }
    handleChangeTel = props => {
        console.log(props)
        props.tel1
            ? this.setState({
                  tel1Valid: props.tel1Valid,
                  apiData: { ...this.state.apiData, tel1: props.tel1, tel1Ext: props.tel1Ext },
              })
            : this.setState({
                  contTelValid: props.contTelValid,
                  apiData: { ...this.state.apiData, contTel: props.contTel, contTelExt: props.contTelExt },
              })
    }
    checkValid() {
        const {
            addrContValid,
            capitalValid,
            headcountValid,
            nameChnValid,
            collaborateWayValid,
            paymentMethodValid,
            compUniIdValid,
            contEmailValid,
            contNameValid,
            contTelMoValid,
            contTelValid,
        } = this.state
        return (
            addrContValid &&
            capitalValid &&
            headcountValid &&
            nameChnValid &&
            collaborateWayValid &&
            paymentMethodValid &&
            compUniIdValid &&
            contEmailValid &&
            contNameValid &&
            contTelMoValid &&
            contTelValid
        )
    }
    /**
     * 檢查資料正確
     * 不為空值:[nameChn,compUniId,headcount,addrCont,contTel,contEmail,collaborateWay,travelAgency,paymentMethod,contName,tel1]
     * */
    checkValueEmpty() {
        console.log('>>')
        const {
                nameChn,
                compUniId,
                headcount,
                addrCont,
                contTel,
                contEmail,
                collaborateWay,
                travelAgency,
                paymentMethod,
                contName,
                tel1,
            } = this.state.apiData,
            checkValueEmptyArr = [
                nameChn,
                compUniId,
                headcount,
                addrCont,
                contTel,
                contEmail,
                collaborateWay,
                travelAgency,
                paymentMethod,
                contName,
                tel1,
            ],
            checkValidOption = [
                'nameChnValid',
                'compUniIdValid',
                'headcountValid',
                'addrContValid',
                'contTelValid',
                'contEmailValid',
                'collaborateWayValid',
                'travelAgencyValid',
                'paymentMethodValid',
                'contNameValid',
                'tel1Valid',
            ]

        if (checkValueEmptyArr.some(item => item === '')) {
            checkValueEmptyArr.map((item, index) => {
                if (item === '') {
                    if (checkValidOption[index] === 'addrContValid') {
                        this.setState({
                            addrContCountyValid: this.state.apiData.addrContCounty ? true : false,
                            addrContDistrictValid: this.state.apiData.addrContDistrict ? true : false,
                            zipContValid: this.state.apiData.zipCont ? true : false,
                        })
                    }
                    this.setState({ [checkValidOption[index]]: false })
                }
            })
            return false
        } else {
            return true
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        console.log(this.checkValid(), this.checkValueEmpty())
        if (this.checkValid() && this.checkValueEmpty()) {
            const member = this.state.apiData
            this.props.addB2eMemData(member)
            this.props.router.push('/finish')
        }
        return
    }
    render() {
        const dealerTypeOptions = [
                '資訊科技業',
                '金融保險業',
                '服務業',
                '營造業',
                '軍警公務員',
                '教育學術',
                '製造業',
                '其他',
            ],
            compScaleOptions = ['中小企業', '公開發行公司', '上市 / 上櫃公司', '公家單位', '集團企業'],
            collaborateWayOptions = ['員工旅遊補助', '員工團體旅遊', '其他'],
            tourAgencyOptions = ['0家', '1家', '2家', '3家', '4家', '5家'],
            paymentMethodOptions = ['企業月結', '員工自行付款', '其他']
        const {
            nameChn, //公司名稱*
            compUniId, //統一編號*
            tel1Ext, //公司分機
            headcount, //員工人數
            compScale,
            addrCont, //聯絡地址
            addrContCounty,
            addrContDistrict,
            zipCont, //郵遞區號
            dealerType, //產業類別
            capital, //資本額
            contTelExt, //聯絡人電話(區碼+電話)
            contTel, //分機
            contEmail, //聯絡人電子信箱
            contTelMo, //聯絡人手機
            collaborateWay, //配合方式
            demand, //其他
            travelAgency, //配合旅行社
            paymentMethod, //付款方式
            subsidy,
        } = this.state.apiData
        return (
            <div className="content">
                <FormHeader
                    title="歡迎加入易遊網企業會員"
                    desc="請填妥以下資料，易遊網企業服務中心將會盡速與您聯絡。"
                />
                <form onReset={this.handleFormReset} onSubmit={this.handleSubmit}>
                    <FormContainer index="1" subtitle="企業資訊">
                        <TextInput
                            label="公司名稱*"
                            placeholder="請輸入"
                            max="50"
                            name="nameChn"
                            value={nameChn}
                            validName="nameChnValid"
                            valid={this.state.nameChnValid}
                            validityMessage={'請輸入公司名稱'} //錯誤訊息
                            onChange={this.handleChange}
                        />
                        <TextInput
                            label="統一編號*"
                            placeholder="請輸入"
                            type="text"
                            name="compUniId"
                            value={compUniId}
                            validName="compUniIdValid"
                            valid={this.state.compUniIdValid}
                            validityMessage={this.state.compUniIdMsg}
                            onChange={this.handleChange}
                            max="8"
                            /*required="required"*/
                        />
                        <TextInput
                            label="公司電話*"
                            controlType={'tel'}
                            name={[
                                {
                                    name: 'telArea',
                                    placeholder: '區碼',
                                    value: this.state.telArea,
                                    valid: this.state.tel1Valid,
                                    validName: 'tel1Valid',
                                    onChange: this.handleChange,
                                    max: '4',
                                    // required: 'required',
                                },
                                {
                                    name: 'tel',
                                    placeholder: '電話',
                                    value: this.state.tel,
                                    valid: this.state.tel1Valid,
                                    validName: 'tel1Valid',
                                    onChange: this.handleChange,
                                    max: '10',
                                    // required: 'required',
                                },
                                {
                                    name: 'tel1Ext',
                                    placeholder: '分機',
                                    value: tel1Ext,
                                    valid: 'true',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                            ]}
                            validName="tel1Valid"
                            valid={this.state.tel1Valid}
                            validityMessage={'請輸入公司電話'}
                            handleChangeTel={this.handleChangeTel}
                        />
                        <TextInput
                            label="員工人數*"
                            placeholder="請輸入"
                            type="text"
                            name="headcount"
                            value={headcount}
                            validName="headcountValid"
                            valid={this.state.headcountValid}
                            validityMessage={this.state.headcountMsg}
                            onChange={this.handleChange}
                            // required="required"
                        />
                        <AddressInput
                            label="聯絡地址*"
                            name={['addrContCounty', 'addrContDistrict', 'zipCont', 'addrCont']}
                            countyValue={''}
                            value={[addrContCounty, addrContDistrict, zipCont, addrCont]}
                            valid={[
                                this.state.addrContCountyValid,
                                this.state.addrContDistrictValid,
                                this.state.zipContValid,
                                this.state.addrContValid,
                            ]}
                            validName="addrContValid"
                            validityMessage={'請輸入聯絡地址'}
                            onChange={this.handleChange}
                            handleChangeCounty={this.handleChangeCounty}
                            max="50"
                            // required="required"
                        />

                        <SelectInput
                            label="公司規模"
                            placeholder="請選擇"
                            options={compScaleOptions}
                            name="compScale"
                            valid="true"
                            value={compScale}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            label="產業類別"
                            placeholder="請選擇"
                            options={dealerTypeOptions}
                            name="dealerType"
                            valid="true"
                            value={dealerType}
                            onChange={this.handleChange}
                        />

                        <TextInput
                            label="資本額"
                            placeholder="請輸入"
                            name="capital"
                            value={capital}
                            validName="capitalValid"
                            valid={this.state.capitalValid}
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-2 */}
                    <FormContainer index="2" subtitle="聯絡人資料">
                        <TextInput
                            name="contName"
                            subName={[
                                {
                                    name: 'contNameLast',
                                    placeholder: '姓',
                                    value: this.props.contNameLast,
                                    valid: this.state.contNameValid,
                                    validName: 'contNameValid',
                                    onChange: this.handleChange,
                                    handleChangeName: this.handleChangeName,
                                    max: '5',
                                    // required: 'required',
                                },
                                {
                                    name: 'contNameFirst',
                                    placeholder: '名',
                                    value: this.props.contNameFirst,
                                    valid: this.state.contNameValid,
                                    validName: 'contNameValid',
                                    onChange: this.handleChange,
                                    handleChangeName: this.handleChangeName,
                                    max: '10',
                                    // required: 'required',
                                },
                            ]}
                            label="姓名*"
                            placeholder="請輸入"
                            value={this.state.apiData.contNameFirst + this.state.apiData.contNameLast}
                            valid={this.state.contNameValid}
                            validityMessage={'請輸入聯絡人姓名'}
                            onChange={this.handleChange}
                            handleChangeName={this.handleChangeName}
                            max="10"
                        />
                        <TextInput
                            label="電話*"
                            controlType={'tel'}
                            name={[
                                {
                                    name: 'contTelArea',
                                    placeholder: '區碼',
                                    value: this.state.contTelArea,
                                    valid: this.state.contTelValid,
                                    validName: 'contTelValid',
                                    onChange: this.handleChange,
                                    max: '4',
                                    // required: 'required',
                                },
                                {
                                    name: 'contTel',
                                    placeholder: '電話',
                                    value: contTel,
                                    valid: this.state.contTelValid,
                                    validName: 'contTelValid',
                                    onChange: this.handleChange,
                                    max: '10',
                                    // required: 'required',
                                },
                                {
                                    name: 'contTelExt',
                                    placeholder: '分機',
                                    value: contTelExt,
                                    valid: true,
                                    validName: 'contTelValid',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                            ]}
                            valid={this.state.contTelValid}
                            validityMessage={'請輸入連絡電話'}
                            handleChangeTel={this.handleChangeTel}
                        />
                        <TextInput
                            name="contEmail"
                            value={contEmail}
                            label="電子信箱*"
                            placeholder="請輸入"
                            type="email"
                            valid={this.state.contEmailValid}
                            validName="contEmailValid"
                            validityMessage={this.state.contEmailMsg}
                            onChange={this.handleChange}
                            // required="required"
                        />
                        <TextInput
                            name="contTelMo"
                            label="行動電話"
                            placeholder="(例) 0900888333"
                            value={contTelMo}
                            valid={this.state.contTelMoValid}
                            validName="contTelMoValid"
                            validityMessage={this.state.contTelMoMsg}
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-3 */}
                    <FormContainer index="3" subtitle="企業配合需求">
                        <SelectInput
                            options={collaborateWayOptions}
                            placeholder="請選擇"
                            name="collaborateWay"
                            label="配合方式*"
                            value={collaborateWay}
                            valid={this.state.collaborateWayValid}
                            validityMessage={'請選擇配合需求'}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            options={paymentMethodOptions}
                            placeholder="請選擇"
                            name="paymentMethod"
                            label="付款方式*"
                            value={paymentMethod}
                            valid={this.state.paymentMethodValid}
                            validityMessage={'請選擇付款方式'}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            options={tourAgencyOptions}
                            placeholder="請選擇"
                            name="travelAgency"
                            label="預計配合旅行社*"
                            value={travelAgency}
                            valid={this.state.travelAgencyValid}
                            validityMessage={'請選擇預計配合旅行社'}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            label={'每人補助金額'}
                            placeholder="(元/人)"
                            value={subsidy}
                            name="subsidy"
                            valid="true"
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-4 */}
                    <FormContainer index="4" subtitle="其他">
                        <TextInput
                            name="demand"
                            label="特殊需求備註"
                            controlType={'textarea'}
                            rows="3"
                            value={demand}
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    <div className="buttonArea">
                        <Button variant="gray" label={'清除重填'} type="reset" onClick={this.handleFormReset}></Button>
                        <Button type="submit" label={'確認送出'}></Button>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        state,
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))
