import React, { Component } from 'react'
import { connect } from 'react-redux'
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
                COMP_NAME: '', //公司名稱*
                COMP_UNI_ID: '', //統一編號*
                TEL: '', //公司電話*
                TEL_AREA: '', //公司區碼
                TEL_EXT: '', //公司分機
                COMP_EMPOLYEE: '', //員工人數
                COMP_SCALE: '',
                ADDR_CONT: '', //聯絡地址
                ADDR_CONT_COUNTY: '',
                ADDR_CONT_DISTRICT: '',
                ZIP_CONT: '', //郵遞區號
                DEALER_TYPE: '', //產業類別
                COMP_AMOUNT: '', //資本額
                CONT_NAME: '', //聯絡人姓名
                CONT_TEL_EXT: '', //聯絡人電話(區碼+電話+分機)
                CONT_TEL: '',
                CONT_TEL_AREA: '',
                CONT_EMAIL: '', //聯絡人電子信箱
                CONT_TEL_MO: '', //聯絡人手機
                COMP_NEED: '', //配合方式
                B2E_OTHER: '', //其他
                COMP_TOUR_AGENCY: '', //配合旅行社
                COMP_PAY_CHOICE: '', //付款方式
                MONEY_BY_PEOPLE: '', //每人補助金額
            },
            COMP_NAME_VALID: true,
            COMP_UNI_ID_VALID: true,
            COMP_UNI_ID_MSG: '請輸入統一編號',
            TEL_VALID: true,
            COMP_EMPOLYEE_VALID: true,
            COMP_EMPOLYEE_MSG: '請輸入員工人數',
            ADDR_CONT_VALID: true, //聯絡地址
            COMP_AMOUNT_VALID: true, //驗證是否為輸入數字??100000000
            CONT_NAME_VALID: true,
            CONT_TEL_VALID: true,
            CONT_EMAIL_VALID: true,
            CONT_EMAIL_MSG: '請輸入電子信箱',
            CONT_TEL_MO_VALID: true,
            CONT_TEL_MO_MSG: '請輸入聯絡人手機',
            COMP_NEED_VALID: true,
            B2E_OTHER: '', //其他
            COMP_PAY_CHOICE_VALID: true,
            controlType: null,
            rows: null,
        }
        this.state = this.initialState
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        //console.log(event.target)
        const { name, value, type, checked } = event.target ? event.target : event
        const checkNumArr = ['COMP_EMPOLYEE'] //需要驗證為數字name欄位
        type === 'checkbox'
            ? this.setState({ [name]: checked })
            : this.setState({ apiData: { ...this.state.apiData, [name]: value } })
        if (typeof event.target !== 'undefined') {
            const valid = event.target.getAttribute('data-valid')
            !isEmpty(value) ? this.setState({ [valid]: true }) : this.setState({ [valid]: false })
            if (name === 'COMP_UNI_ID') {
                console.log(isUniformNumbersErr(value))
                //檢驗統編
                isUniformNumbersErr(value)
                    ? this.setState({ [valid]: isUniformNumbersErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          COMP_UNI_ID_MSG: '請輸入統一編號',
                      })
                    : this.setState({
                          [valid]: isUniformNumbersErr(value),
                          COMP_UNI_ID_MSG: '請確認統一編號',
                      })
            }
            if (name === 'CONT_EMAIL') {
                //檢驗電子信箱
                isEmailErr(value)
                    ? this.setState({ [valid]: isEmailErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          CONT_EMAIL_MSG: '請輸入電子信箱',
                      })
                    : this.setState({
                          [valid]: isEmailErr(value),
                          CONT_EMAIL_MSG: '請確認電子信箱',
                      })
            }
            if (name === 'CONT_TEL_MO') {
                //檢驗行動電話
                isMobileErr(value)
                    ? this.setState({ [valid]: isMobileErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          CONT_TEL_MO_MSG: '請輸入行動電話',
                      })
                    : this.setState({
                          [valid]: isMobileErr(value),
                          CONT_TEL_MO_MSG: '請確認是否為有效行動電話',
                      })
            }
            if (checkNumArr.indexOf(name) > -1) {
                isNumberErr(value) && value !== ''
                    ? this.setState({ [valid]: isNumberErr(value) })
                    : isEmpty(value)
                    ? this.setState({
                          [valid]: false,
                          COMP_EMPOLYEE_MSG: '請輸入員工人數',
                      })
                    : this.setState({
                          [valid]: isNumberErr(value),
                          COMP_EMPOLYEE_MSG: '請輸入有效數字',
                      })
            }
        }
    }
    handleFormReset = () => {
        this.setState(() => this.initialState)
    }
    handleChangeCounty = props => {
        const { ADDR_CONT_COUNTY, ADDR_CONT_DISTRICT, ZIP_CONT } = props
        this.setState({ apiData: { ...this.state.apiData, ADDR_CONT_COUNTY, ADDR_CONT_DISTRICT, ZIP_CONT } })
    }
    handleChangeName = props => {
        const { CONT_NAME } = props
        this.setState({ apiData: { ...this.state.apiData, CONT_NAME } })
    }
    handleChangeTel = props => {
        console.log('props', props)
        props.tel1
            ? this.setState({ apiData: { ...this.state.apiData, tel1: props.tel1 } })
            : this.setState({ apiData: { ...this.state.apiData, contTel: props.contTel } })
    }
    handleSubmit = e => {
        e.preventDefault()
        const member = this.state.apiData
        this.props.addB2eMemData(member)
    }
    render() {
        const DEALER_TYPE_OPTIONS = ['資訊科技業', '金融保險業', '服務業', '營造業', '軍警公務員', '教育學術', '其他'],
            COMP_SCALE_OPTIONS = ['中小企業', '公開發行公司', '上市 / 上櫃公司', '公家單位', '集團企業'],
            COMP_NEED_OPTIONS = ['企業福委', '商務差旅', '企業贈禮']
        const {
            COMP_NAME, //公司名稱*
            COMP_UNI_ID, //統一編號*
            TEL, //公司電話*
            TEL_AREA, //公司區碼
            TEL_EXT, //公司分機
            COMP_EMPOLYEE, //員工人數
            COMP_SCALE,
            ADDR_CONT, //聯絡地址
            ADDR_CONT_COUNTY,
            ADDR_CONT_DISTRICT,
            ZIP_CONT, //郵遞區號
            DEALER_TYPE, //產業類別
            COMP_AMOUNT, //資本額
            CONT_NAME, //聯絡人姓名
            CONT_TEL_EXT, //聯絡人電話(區碼+電話+分機)
            CONT_TEL,
            CONT_TEL_AREA,
            CONT_EMAIL, //聯絡人電子信箱
            CONT_TEL_MO, //聯絡人手機
            COMP_NEED, //配合方式
            B2E_OTHER, //其他
            COMP_TOUR_AGENCY, //配合旅行社
            COMP_PAY_CHOICE, //付款方式
            MONEY_BY_PEOPLE,
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
                            id="COMP_NAME"
                            name="COMP_NAME"
                            value={COMP_NAME} //傳回後端的value
                            validName="COMP_NAME_VALID" //setState使用
                            valid={this.state.COMP_NAME_VALID}
                            validityMessage={'請輸入公司名稱'} //錯誤訊息
                            onChange={this.handleChange}
                        />
                        <TextInput
                            label="統一編號*"
                            placeholder="請輸入"
                            type="text"
                            id="COMP_UNI_ID"
                            name="COMP_UNI_ID"
                            value={COMP_UNI_ID}
                            validName="COMP_UNI_ID_VALID"
                            valid={this.state.COMP_UNI_ID_VALID}
                            validityMessage={this.state.COMP_UNI_ID_MSG}
                            onChange={this.handleChange}
                            max="8"
                        />
                        <TextInput
                            label="公司電話*"
                            controlType={'tel'}
                            id="TEL"
                            name={[
                                {
                                    name: 'TEL_AREA',
                                    placeholder: '區碼',
                                    value: TEL_AREA,
                                    valid: this.state.TEL_VALID,
                                    validName: 'TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '4',
                                },
                                {
                                    name: 'TEL',
                                    placeholder: '電話',
                                    value: TEL,
                                    valid: this.state.TEL_VALID,
                                    validName: 'TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '10',
                                },
                                {
                                    name: 'TEL_EXT',
                                    placeholder: '分機',
                                    value: TEL_AREA,
                                    valid: this.state.TEL_VALID,
                                    validName: 'TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                            ]}
                            validName="TEL_VALID"
                            valid={this.state.TEL_VALID}
                            validityMessage={'請輸入公司電話'}
                            handleChangeTel={this.handleChangeTel}
                        />
                        <TextInput
                            label="員工人數*"
                            placeholder="請輸入"
                            type="text"
                            id="COMP_EMPOLYEE"
                            name="COMP_EMPOLYEE"
                            value={COMP_EMPOLYEE}
                            validName="COMP_EMPOLYEE_VALID"
                            valid={this.props.COMP_EMPOLYEE_VALID}
                            validityMessage={this.props.COMP_EMPOLYEE_MSG}
                            onChange={this.handleChange}
                        />
                        <AddressInput
                            label="聯絡地址*"
                            id={['ADDR_CONT_COUNTY', 'ADDR_CONT_DISTRICT', 'ZIP_CONT', 'ADDR_CONT']}
                            name={['ADDR_CONT_COUNTY', 'ADDR_CONT_DISTRICT', 'ZIP_CONT', 'ADDR_CONT']}
                            countyValue={''}
                            value={[ADDR_CONT_COUNTY, ADDR_CONT_DISTRICT, ZIP_CONT, ADDR_CONT]}
                            valid={this.state.ADDR_CONT_VALID}
                            validityMessage={'請輸入聯絡地址'}
                            onChange={this.handleChange}
                            handleChangeCounty={this.handleChangeCounty}
                            max="50"
                        />

                        <SelectInput
                            label="公司規模"
                            placeholder="請選擇"
                            options={COMP_SCALE_OPTIONS}
                            id="COMP_SCALE"
                            name="COMP_SCALE"
                            value={this.props.COMP_SCALE}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            label="產業類別"
                            placeholder="請選擇"
                            options={DEALER_TYPE_OPTIONS}
                            id="DEALER_TYPE"
                            name="DEALER_TYPE"
                            value={this.props.DEALER_TYPE}
                            onChange={this.handleChange}
                        />

                        <TextInput
                            label="資本額"
                            placeholder="請輸入"
                            id="COMP_AMOUNT"
                            name="COMP_AMOUNT"
                            value={this.props.COMP_AMOUNT}
                            validName="COMP_AMOUNT_VALID"
                            valid={this.props.COMP_AMOUNT_VALID}
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-2 */}
                    <FormContainer index="2" subtitle="聯絡人資料">
                        <TextInput
                            id="CONT_NAME"
                            name="CONT_NAME"
                            subName={[
                                {
                                    name: 'CONT_NAME_LAST',
                                    placeholder: '姓',
                                    value: this.props.CONT_NAME_LAST,
                                    valid: this.props.CONT_NAME_LAST_VALID,
                                    validName: 'CONT_NAME_LAST_VALID',
                                    onChange: this.handleChange,
                                    handleChangeName: this.handleChangeName,
                                    max: '5',
                                },
                                {
                                    name: 'CONT_NAME_FIRST',
                                    placeholder: '名',
                                    value: this.props.CONT_NAME_FIRST,
                                    valid: this.props.CONT_NAME_FIRST_VALID,
                                    validName: 'CONT_NAME_FIRST_VALID',
                                    onChange: this.handleChange,
                                    handleChangeName: this.handleChangeName,
                                    max: '10',
                                },
                            ]}
                            label="姓名*"
                            placeholder="請輸入"
                            value={this.state.apiData.CONT_NAME_FIRST + this.state.apiData.CONT_NAME_LAST}
                            valid={this.state.CONT_NAME_VALID}
                            validityMessage={'請輸入聯絡人姓名'}
                            onChange={this.handleChange}
                            handleChangeName={this.handleChangeName}
                            max="10"
                        />
                        <TextInput
                            id="CONT_TEL"
                            label="電話*"
                            controlType={'tel'}
                            name={[
                                {
                                    name: 'CONT_TEL_AREA',
                                    placeholder: '區碼',
                                    value: this.props.CONT_TEL_AREA,
                                    validName: 'CONT_TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '4',
                                },
                                {
                                    name: 'CONT_TEL',
                                    placeholder: '電話',
                                    value: this.props.TEL,
                                    validName: 'CONT_TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '10',
                                },
                                {
                                    name: 'CONT_TEL_EXT',
                                    placeholder: '分機',
                                    value: this.props.CONT_TEL_EXT,
                                    validName: 'CONT_TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                            ]}
                            valid={this.state.CONT_TEL_VALID}
                            validityMessage={'請輸入連絡電話'}
                            handleChangeTel={this.handleChangeTel}
                        />
                        <TextInput
                            id="CONT_EMAIL"
                            name="CONT_EMAIL"
                            value={CONT_EMAIL}
                            label="電子信箱*"
                            placeholder="請輸入"
                            type="email"
                            valid={this.props.CONT_EMAIL_VALID}
                            validName="CONT_EMAIL_VALID"
                            validityMessage={this.props.CONT_EMAIL_MSG}
                            onChange={this.handleChange}
                        />
                        <TextInput
                            id="CONT_TEL_MO"
                            name="CONT_TEL_MO"
                            label="行動電話"
                            placeholder="(例) 0900888333"
                            value={CONT_TEL_MO}
                            valid={this.props.CONT_TEL_MO_VALID}
                            validName="CONT_TEL_MO_VALID"
                            validityMessage={this.props.CONT_TEL_MO_MSG}
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-3 */}
                    <FormContainer index="3" subtitle="企業配合需求">
                        <SelectInput
                            options={COMP_NEED_OPTIONS}
                            placeholder="請選擇"
                            id="COMP_NEED"
                            name="COMP_NEED"
                            label="配合方式*"
                            value={COMP_NEED}
                            valid={this.state.COMP_NEED_VALID}
                            validityMessage={'請選擇配合需求'}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            options={DEALER_TYPE_OPTIONS}
                            placeholder="請選擇"
                            id="COMP_PAY_CHOICE"
                            name="COMP_PAY_CHOICE"
                            label="付款方式*"
                            value={COMP_PAY_CHOICE}
                            valid={this.state.COMP_PAY_CHOICE_VALID}
                            validityMessage={'請選擇付款方式'}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            options={DEALER_TYPE_OPTIONS}
                            placeholder="請選擇"
                            id={'COMP_TOUR_AGENCY'}
                            name="COMP_TOUR_AGENCY"
                            label="預計配合旅行社*"
                            value={this.props.value}
                            valid={true}
                            validityMessage={'請選擇預計配合旅行社'}
                        />
                        <TextInput
                            id={'MONEY_BY_PEOPLE'}
                            label={'每人補助金額'}
                            placeholder="(元/人)"
                            value={MONEY_BY_PEOPLE}
                            name="MONEY_BY_PEOPLE"
                            onChange={this.handleChange}
                        />
                    </FormContainer>
                    {/**part-4 */}
                    <FormContainer index="4" subtitle="其他">
                        <TextInput
                            id="B2E_OTHER"
                            name="B2E_OTHER"
                            label="特殊需求備註"
                            controlType={'textarea'}
                            rows="3"
                            value={this.state.apiData.B2E_OTHER}
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
    //console.log(state)
    return {
        state,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form)
