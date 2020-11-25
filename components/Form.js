import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { getData } from './actions/index'
import FormHeader from './UI/FormHeader'
import TextInput from './UI/TextInput'
import SelectInput from './UI/SelectInput'
import AddressInput from './UI/AddressInput'
import FormContainer from './UI/FormContainer'
import Button from './UI/Button'
import { isEmpty, isUniformNumbersErr, isEmailErr, isMobileErr, isNumberErr } from './helpers/validation'

export class Form extends Component {
    constructor() {
        super()
        // this.initialState = {
        //     COMP_NAME: '', //公司名稱*
        //     COMP_NAME_VALID: true,

        //     COMP_UNI_ID: '', //統一編號*
        //     COMP_UNI_ID_VALID: true,
        //     COMP_UNI_ID_MSG: '請輸入統一編號',

        //     TEL_VALID: true,
        //     TEL: '', //公司電話*
        //     TEL_AREA: '', //公司區碼
        //     TEL_EXT: '', //公司分機

        //     COMP_EMPOLYEE: '', //員工人數
        //     COMP_EMPOLYEE_VALID: true,
        //     COMP_EMPOLYEE_MSG: '請輸入員工人數',
        //     COMP_SCALE: '', //公司規模

        //     ADDR_CONT: '', //聯絡地址
        //     ADDR_CONT_COUNTY: '',
        //     ADDR_CONT_DISTRICT: '',
        //     ZIP_CONT: '', //郵遞區號
        //     ADDR_CONT_VALID: true, //聯絡地址
        //     DEALER_TYPE: '', //產業類別
        //     COMP_AMOUNT: '', //資本額
        //     COMP_AMOUNT_VALID: true, //驗證是否為輸入數字??100000000
        //     ///
        //     CONT_NAME: '', //聯絡人姓名
        //     CONT_NAME_FIRST: '', //聯絡人名
        //     CONT_NAME_LAST: '', //聯絡人姓
        //     CONT_NAME_VALID: true,

        //     CONT_TEL_EXT: '', //聯絡人電話(區碼+電話+分機)
        //     CONT_TEL: '',
        //     CONT_TEL_AREA: '',
        //     CONT_TEL_VALID: true,

        //     CONT_EMAIL: '', //聯絡人電子信箱
        //     CONT_EMAIL_VALID: true,
        //     CONT_EMAIL_MSG: '請輸入電子信箱',

        //     CONT_TEL_MO: '', //聯絡人手機
        //     CONT_TEL_MO_VALID: true,
        //     CONT_TEL_MO_MSG: '請輸入聯絡人手機',
        //     ///
        //     COMP_NEED: '', //配合方式
        //     COMP_NEED_VALID: true,
        //     B2E_OTHER: '', //其他
        //     COMP_TOUR_AGENCY: '', //配合旅行社
        //     COMP_PAY_CHOICE: '', //付款方式
        //     COMP_PAY_CHOICE_VALID: true,
        //     MONEY_BY_PEOPLE: '', //每人補助金額
        //     controlType: null,
        //     id: '',
        //     label: '',
        //     rows: null,
        //     validityMessage: '',
        // }
        // this.state = this.initialState
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        //console.log(event);
        const { name, value, type, checked } = event.target ? event.target : event
        const checkNumArr = ['COMP_EMPOLYEE']
        type === 'checkbox' ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        //console.log(event)
        if (typeof event.target !== 'undefined') {
            const valid = event.target.getAttribute('data-valid')
            //console.log(valid)
            !isEmpty(value) ? this.setState({ [valid]: true }) : this.setState({ [valid]: false })
            if (name === 'COMP_UNI_ID') {
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
                //console.log(isNumberErr(value));
                //console.log('empty', isEmpty(value));
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
        console.log(props)
        this.setState(props)
    }
    // componentDidMount() {
    //     //componentDidMount 的生命週期方法內，使用 AJAX 呼叫來填充資料。
    //     fetch('https://api.example.com/items')
    //         .then(res => res.json())
    //         .then(
    //             result => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     items: result.items,
    //                 })
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             error => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error,
    //                 })
    //             }
    //         )
    // }
    render() {
        // <option value="0" selected="selected">請選擇</option>

        // 		<option value="IT">資訊科技業</option>

        // 		<option value="FIN">金融保險業</option>

        // 		<option value="SER">服務業</option>

        // 		<option value="BUL">營造業</option>

        // 		<option value="GGG">軍警公務員</option>

        // 		<option value="EDU">教育學術</option>

        // 		<option value="MAN">製造業</option>

        // 		<option value="ETC">其他</option>

        const DEALER_TYPE_OPTIONS = ['資訊科技業', '金融保險業', '服務業', '營造業', '軍警公務員', '教育學術', '其他'],
            COMP_SCALE_OPTIONS = ['中小企業', '公開發行公司', '上市 / 上櫃公司', '公家單位', '集團企業'],
            COMP_NEED_OPTIONS = ['企業福委', '商務差旅', '企業贈禮']

        return (
            <div className="content">
                <FormHeader
                    title="歡迎加入易遊網企業會員"
                    desc="請填妥以下資料，易遊網企業服務中心將會盡速與您聯絡。"
                />
                <form onReset={this.handleFormReset}>
                    <FormContainer index="1" subtitle="企業資訊">
                        <TextInput
                            //欄位名稱
                            label="公司名稱*"
                            placeholder="請輸入"
                            max="50"
                            //setState使用
                            id="COMP_NAME"
                            name="COMP_NAME"
                            value={this.props.COMP_NAME} //傳回後端的value
                            //判斷是否有效
                            validName="COMP_NAME_VALID" //setState使用
                            valid={this.props.COMP_NAME_VALID}
                            validityMessage={'請輸入公司名稱'} //錯誤訊息
                            //func//input onchange時使用
                            onChange={this.handleChange}
                        />
                        <TextInput
                            label="統一編號*"
                            placeholder="請輸入"
                            type="text"
                            id="COMP_UNI_ID"
                            name="COMP_UNI_ID"
                            value={this.props.COMP_UNI_ID}
                            validName="COMP_UNI_ID_VALID"
                            valid={this.props.COMP_UNI_ID_VALID}
                            validityMessage={this.props.COMP_UNI_ID_MSG}
                            onChange={this.handleChange}
                            //其他設定
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
                                    value: this.props.TEL_AREA,
                                    valid: this.props.TEL_VALID,
                                    validName: 'TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '4',
                                },
                                {
                                    name: 'TEL',
                                    placeholder: '電話',
                                    value: this.props.TEL,
                                    valid: this.props.TEL_VALID,
                                    validName: 'TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '10',
                                },
                                {
                                    name: 'TEL_EXT',
                                    placeholder: '分機',
                                    value: this.props.TEL_AREA,
                                    valid: this.props.TEL_VALID,
                                    validName: 'TEL_VALID',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                            ]}
                            validName="TEL_VALID"
                            valid={this.props.TEL_VALID}
                            validityMessage={'請輸入公司電話'}
                        />
                        <TextInput
                            label="員工人數*"
                            placeholder="請輸入"
                            type="text"
                            id="COMP_EMPOLYEE"
                            name="COMP_EMPOLYEE"
                            value={this.props.COMP_EMPOLYEE}
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
                            value={[
                                this.props.ADDR_CONT_COUNTY,
                                this.props.ADDR_CONT_DISTRICT,
                                this.props.ZIP_CONT,
                                this.props.ADDR_CONT,
                            ]}
                            valid={this.props.ADDR_CONT_VALID}
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
                        <div>
                            <p>公司名稱:{this.props.COMP_NAME}</p>
                            <p>統一編號:{this.props.COMP_UNI_ID}</p>
                            <p>
                                公司電話:{this.props.TEL_AREA}-{this.props.TEL}-{this.props.TEL_EXT}
                            </p>
                            <p>員工人數:{this.props.COMP_EMPOLYEE}</p>
                            <p>聯絡地址:{this.props.ADDR_CONT}</p>
                            <p>公司規模:{this.props.COMP_SCALE}</p>
                            <p>產業類別:{this.props.DEALER_TYPE}</p>
                            <p>資本額:{this.props.COMP_AMOUNT}</p>
                        </div>
                    </FormContainer>
                    {/**part-2 */}
                    <FormContainer index="2" subtitle="聯絡人資料">
                        <TextInput
                            id="CONT_NAME"
                            name="CONT_NAME"
                            name={[
                                {
                                    name: 'CONT_NAME_LAST',
                                    placeholder: '姓',
                                    value: this.props.CONT_NAME_LAST,
                                    valid: this.props.CONT_NAME_LAST_VALID,
                                    validName: 'CONT_NAME_LAST_VALID',
                                    onChange: this.handleChange,
                                    max: '5',
                                },
                                {
                                    name: 'CONT_NAME_FIRST',
                                    placeholder: '名',
                                    value: this.props.CONT_NAME_FIRST,
                                    valid: this.props.CONT_NAME_FIRST_VALID,
                                    validName: 'CONT_NAME_FIRST_VALID',
                                    onChange: this.handleChange,
                                    max: '10',
                                },
                            ]}
                            label="姓名*"
                            placeholder="請輸入"
                            value={this.props.CONT_NAME}
                            valid={this.props.CONT_NAME_VALID}
                            validityMessage={'請輸入聯絡人姓名'}
                            onChange={this.handleChange}
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
                            valid={this.props.CONT_TEL_VALID}
                            validityMessage={'請輸入連絡電話'}
                        />
                        <TextInput
                            id="CONT_EMAIL"
                            name="CONT_EMAIL"
                            value={this.props.CONT_EMAIL}
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
                            value={this.props.CONT_TEL_MO}
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
                            value={this.props.COMP_NEED}
                            valid={this.props.COMP_NEED_VALID}
                            validityMessage={'請選擇配合需求'}
                            onChange={this.handleChange}
                        />
                        <SelectInput
                            options={DEALER_TYPE_OPTIONS}
                            placeholder="請選擇"
                            id="COMP_PAY_CHOICE"
                            name="COMP_PAY_CHOICE"
                            label="付款方式*"
                            value={this.props.COMP_PAY_CHOICE}
                            valid={this.props.COMP_PAY_CHOICE_VALID}
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
                            valid={this.props.valid}
                            validityMessage={'請選擇預計配合旅行社'}
                        />
                        <TextInput
                            id={'moneyByPeople'}
                            label={'每人補助金額'}
                            placeholder="(元/人)"
                            value={this.props.MONEY_BY_PEOPLE}
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
                            value={this.props.B2E_OTHER}
                            onChange={this.handleChange}
                        />
                    </FormContainer>

                    {/**按鈕區塊 */}
                    <div className="buttonArea">
                        <Button variant="gray" label={'清除重填'} type="reset" onClick={this.handleFormReset}></Button>
                        <Button label={'確認送出'} onClick={e => console.log(e)}></Button>
                    </div>
                </form>
                {/*footer*/}
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log(state)
    return {
        state,
    }
}
export default connect(mapStateToProps)(Form)
