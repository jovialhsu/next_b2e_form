import React, { Component } from 'react'
import { isEmpty } from '../helpers/validation'
import Count from './Count'

export default class TextInput extends Component {
    constructor(props) {
        super()
        this.state = {
            contNameLast: '',
            contNameFirst: '',
            contTelArea: '',
            contTel: '',
            telArea: '',
            tel: '',
            tel1Ext: '',
            contTelExt: '',
        }
    }
    changeName = e => {
        const { handleChangeName } = this.props
        const { name, value } = e.target
        const valid = e.target.getAttribute('data-valid')
        this.setState({ [name]: value }, () => {
            if (typeof handleChangeName === 'function') {
                handleChangeName({
                    contName: this.state.contNameLast + this.state.contNameFirst,
                    [valid]: !isEmpty(value) ? true : false,
                })
            }
        })
    }
    changeTel = e => {
        const { handleChangeTel } = this.props
        const { name, value } = e.target
        const valid = e.target.getAttribute('data-valid')
        this.setState({ [name]: value }, () => {
            if (typeof handleChangeTel === 'function') {
                let props = {}
                if (name.indexOf('cont') > -1) {
                    props = {
                        contTel: `${this.state.contTelArea}-${this.state.contTel}`,
                        contTelExt: !isEmpty(this.state.contTelExt) ? `#${this.state.contTelExt}` : '',
                        [valid]: !isEmpty(value) ? true : false,
                    }
                } else {
                    props = {
                        tel1: `${this.state.telArea}-${this.state.tel}`,
                        tel1Ext: !isEmpty(this.state.tel1Ext) ? `#${this.state.tel1Ext}` : '',
                        [valid]: !isEmpty(value) ? true : false,
                    }
                }
                handleChangeTel(props)
            }
        })
    }
    render() {
        let widthClass = this.props.controlType === 'textarea' ? 'address' : ''
        const divProps = Object.assign({}, this.props)
        return (
            <div className={'form-control ' + widthClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                {this.props.controlType === 'textarea' ? (
                    [
                        <Count key={0} value={this.props.value} maxLength="500" />,
                        <textarea
                            key={1}
                            rows={this.props.rows}
                            name={this.props.name}
                            cols="30"
                            onChange={this.props.onChange}
                            defaultValue={this.props.defaultValue}
                            maxLength="500"
                        ></textarea>,
                    ]
                ) : this.props.controlType === 'tel' ? (
                    <div className="input-container">
                        {this.props.name &&
                            this.props.name.map(item => (
                                <input
                                    className={!item.valid ? 'invalid' : ''}
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    data-valid={item.validName}
                                    key={item.name}
                                    onChange={this.changeTel}
                                    maxLength={item.max}
                                    required={item.required}
                                />
                            ))}
                    </div>
                ) : this.props.name === 'contName' ? (
                    <div className="input-container">
                        {this.props.subName &&
                            this.props.subName.map(item => (
                                <input
                                    className={!item.valid ? 'invalid' : ''}
                                    name={item.name}
                                    data-valid={item.validName}
                                    key={item.name}
                                    placeholder={item.placeholder}
                                    onChange={this.changeName}
                                    maxLength={item.max}
                                    handleChangeName={item.handleChangeName}
                                    required={item.required}
                                />
                            ))}
                    </div>
                ) : (
                    <input
                        className={!this.props.valid ? 'invalid' : ''}
                        type={this.props.type}
                        name={this.props.name}
                        data-valid={this.props.validName}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        maxLength={this.props.max}
                        required={this.props.required}
                    />
                )}

                {this.props.validityMessage && !this.props.valid ? (
                    <p className="error-message">{this.props.validityMessage}</p>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
