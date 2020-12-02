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
                compName: '', //公司名稱*
                compUniId: '', //統一編號*
                tel: '', //公司電話*
                telArea: '', //公司區碼
                telExt: '', //公司分機
                compEmpolyee: '', //員工人數
                compScale: '',
                addrCont: '', //聯絡地址
                addrContCounty: '',
                addrContDistrict: '',
                zipCont: '', //郵遞區號
                dealerType: '', //產業類別
                compAmount: '', //資本額
                contName: '', //聯絡人姓名
                contTelExt: '', //聯絡人電話(區碼+電話+分機)
                contTel: '',
                contTelArea: '',
                contEmail: '', //聯絡人電子信箱
                contTelMo: '', //聯絡人手機
                compNeed: '', //配合方式
                b2eOther: '', //其他
                compTourAgency: '', //配合旅行社
                compPayChoice: '', //付款方式
                moneyByPeople: '', //每人補助金額
            },
            compNameValid: true,
            compUniIdValid: true,
            compUniIdMsg: '請輸入統一編號',
            telValid: true,
            compEmpolyeeValid: true,
            compEmpolyeeMsg: '請輸入員工人數',
            addrContValid: true, //聯絡地址
            compAmountValid: true, //驗證是否為輸入數字??100000000
            contNameValid: true,
            contTelValid: true,
            contEmailValid: true,
            contEmailMsg: '請輸入電子信箱',
            contTelMoValid: true,
            contTelMoMsg: '請輸入聯絡人手機',
            compNeedValid: true,
            b2eOther: '', //其他
            compPayChoiceValid: true,
            controlType: null,
            rows: null,
        }
        this.state = this.initialState
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const { name, value } = event.target ? event.target : event
        const checkNumArr = ['compEmpolyee'] //需要驗證為數字name欄位
        this.setState({ apiData: { ...this.state.apiData, [name]: value } })
        if (typeof event.target !== 'undefined') {
            const valid = event.target.getAttribute('data-valid')
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
                          compUniIdMsg: '請確認統一編號',
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
                          contEmailMsg: '請確認電子信箱',
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
                          compEmpolyeeMsg: '請輸入員工人數',
                      })
                    : this.setState({
                          [valid]: isNumberErr(value),
                          compEmpolyeeMsg: '請輸入有效數字',
                      })
            }
        }
    }
    handleFormReset = () => {
        this.setState(() => this.initialState)
    }
    handleChangeCounty = props => {
        const { addrContCounty, addrContDistrict, zipCont } = props
        this.setState({ apiData: { ...this.state.apiData, addrContCounty, addrContDistrict, zipCont } })
    }
    handleChangeName = props => {
        const { contName } = props
        this.setState({ apiData: { ...this.state.apiData, contName } })
    }
    handleChangeTel = props => {
        props.tel1
            ? this.setState({ apiData: { ...this.state.apiData, tel1: props.tel1, telExt: props.telExt } })
            : this.setState({
                  apiData: { ...this.state.apiData, contTel: props.contTel, contTelExt: props.contTelExt },
              })
    }
    checkValid() {
        //const { addrContValid, compAmountValid ,compEmpolyeeValid}
        return (
            this.state.addrContValid &&
            this.state.compAmountValid &&
            this.state.compEmpolyeeValid &&
            this.state.compNameValid &&
            this.state.compNeedValid &&
            this.state.compPayChoiceValid &&
            this.state.compUniIdValid &&
            this.state.contEmailValid &&
            this.state.contNameValid &&
            this.state.contTelMoValid &&
            this.state.contTelValid
        )
    }
    handleSubmit = e => {
        e.preventDefault()
        console.log(checkValid())
        if (checkValid()) {
            const member = this.state.apiData
            this.props.addB2eMemData(member)
            this.props.router.push('/finish')
        }
        return
    }
    render() {
        const dealerTypeOptions = ['資訊科技業', '金融保險業', '服務業', '營造業', '軍警公務員', '教育學術', '其他'],
            compScaleOptions = ['中小企業', '公開發行公司', '上市 / 上櫃公司', '公家單位', '集團企業'],
            compNeedOptions = ['企業福委', '商務差旅', '企業贈禮'],
            tourAgencyOptions = ['易遊網', '其他'],
            payChoiceOptions = ['月結', '特約']
        const {
            compName, //公司名稱*
            compUniId, //統一編號*
            tel, //公司電話*
            telArea, //公司區碼
            telExt, //公司分機
            compEmpolyee, //員工人數
            compScale,
            addrCont, //聯絡地址
            addrContCounty,
            addrContDistrict,
            zipCont, //郵遞區號
            dealerType, //產業類別
            compAmount, //資本額
            contName, //聯絡人姓名
            contTelExt, //聯絡人電話(區碼+電話+分機)
            contTel,
            contTelArea,
            contEmail, //聯絡人電子信箱
            contTelMo, //聯絡人手機
            compNeed, //配合方式
            b2eOther, //其他
            compTourAgency, //配合旅行社
            compPayChoice, //付款方式
            moneyByPeople,
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
                            name="compName"
                            value={compName} //傳回後端的value
                            validName="compNameValid" //setState使用
                            valid={this.state.compNameValid}
                            validityMessage={'請輸入公司名稱'} //錯誤訊息
                            onChange={this.handleChange}
                            required="required"
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
                            required="required"
                        />
                        <TextInput
                            label="公司電話*"
                            controlType={'tel'}
                            name={[
                                {
                                    name: 'telArea',
                                    placeholder: '區碼',
                                    value: telArea,
                                    valid: this.state.telValid,
                                    validName: 'telValid',
                                    onChange: this.handleChange,
                                    max: '4',
                                    required: 'required',
                                },
                                {
                                    name: 'tel',
                                    placeholder: '電話',
                                    value: tel,
                                    valid: this.state.telValid,
                                    validName: 'telValid',
                                    onChange: this.handleChange,
                                    max: '10',
                                    required: 'required',
                                },
                                {
                                    name: 'telExt',
                                    placeholder: '分機',
                                    value: telExt,
                                    valid: this.state.telValid,
                                    validName: 'telValid',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                            ]}
                            validName="telValid"
                            valid={this.state.telValid}
                            validityMessage={'請輸入公司電話'}
                            handleChangeTel={this.handleChangeTel}
                        />
                        <TextInput
                            label="員工人數*"
                            placeholder="請輸入"
                            type="text"
                            name="compEmpolyee"
                            value={compEmpolyee}
                            validName="compEmpolyeeValid"
                            valid={this.state.compEmpolyeeValid}
                            validityMessage={this.state.compEmpolyeeMsg}
                            onChange={this.handleChange}
                            required="required"
                        />
                        <AddressInput
                            label="聯絡地址*"
                            name={['addrContCounty', 'addrContDistrict', 'zipCont', 'addrCont']}
                            countyValue={''}
                            value={[addrContCounty, addrContDistrict, zipCont, addrCont]}
                            valid={this.state.addrContValid}
                            validityMessage={'請輸入聯絡地址'}
                            onChange={this.handleChange}
                            handleChangeCounty={this.handleChangeCounty}
                            max="50"
                            required="required"
                        />

                        <SelectInput
                            label="公司規模"
                            placeholder="請選擇"
                            options={compScaleOptions}
                            name="compScale"
                            value={compScale}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            label="產業類別"
                            placeholder="請選擇"
                            options={dealerTypeOptions}
                            name="dealerType"
                            value={dealerType}
                            onChange={this.handleChange}
                        />

                        <TextInput
                            label="資本額"
                            placeholder="請輸入"
                            name="compAmount"
                            value={compAmount}
                            validName="compAmountValid"
                            valid={this.state.compAmountValid}
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
                                    valid: this.props.contNameLastValid,
                                    validName: 'contNameLastValid',
                                    onChange: this.handleChange,
                                    handleChangeName: this.handleChangeName,
                                    max: '5',
                                    required: 'required',
                                },
                                {
                                    name: 'contNameFirst',
                                    placeholder: '名',
                                    value: this.props.contNameFirst,
                                    valid: this.props.contNameFirstValid,
                                    validName: 'contNameFirstValid',
                                    onChange: this.handleChange,
                                    handleChangeName: this.handleChangeName,
                                    max: '10',
                                    required: 'required',
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
                                    value: contTelArea,
                                    validName: 'contTelValid',
                                    onChange: this.handleChange,
                                    max: '4',
                                    required: 'required',
                                },
                                {
                                    name: 'contTel',
                                    placeholder: '電話',
                                    value: contTel,
                                    validName: 'contTelValid',
                                    onChange: this.handleChange,
                                    max: '10',
                                    required: 'required',
                                },
                                {
                                    name: 'contTelExt',
                                    placeholder: '分機',
                                    value: contTelExt,
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
                            required="required"
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
                            options={compNeedOptions}
                            placeholder="請選擇"
                            name="compNeed"
                            label="配合方式*"
                            value={compNeed}
                            valid={this.state.compNeedValid}
                            validityMessage={'請選擇配合需求'}
                            onChange={this.handleChange}
                            required="required"
                        />
                        <SelectInput
                            options={payChoiceOptions}
                            placeholder="請選擇"
                            name="compPayChoice"
                            label="付款方式*"
                            value={compPayChoice}
                            valid={this.state.compPayChoiceValid}
                            validityMessage={'請選擇付款方式'}
                            onChange={this.handleChange}
                            required="required"
                        />
                        <SelectInput
                            options={tourAgencyOptions}
                            placeholder="請選擇"
                            name="compTourAgency"
                            label="預計配合旅行社*"
                            value={compTourAgency}
                            valid={true}
                            validityMessage={'請選擇預計配合旅行社'}
                            onChange={this.handleChange}
                            required="required"
                        />
                        <TextInput
                            label={'每人補助金額'}
                            placeholder="(元/人)"
                            value={moneyByPeople}
                            name="moneyByPeople"
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-4 */}
                    <FormContainer index="4" subtitle="其他">
                        <TextInput
                            name="b2eOther"
                            label="特殊需求備註"
                            controlType={'textarea'}
                            rows="3"
                            value={b2eOther}
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
