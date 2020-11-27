import React, { Component } from 'react'
import Count from './Count'

export default class TextInput extends Component {
    constructor(props) {
        super()
        this.state = {
            CONT_NAME_LAST: '',
            CONT_NAME_FIRST: '',
            CONT_TEL_AREA: '',
            CONT_TEL: '',
            TEL_AREA: '',
            TEL: '',
        }
    }
    changeName = e => {
        const { handleChangeName } = this.props
        const { name, value } = e.target
        console.log('props', this.props)
        this.setState({ [name]: value }, () => {
            if (typeof handleChangeName === 'function') {
                handleChangeName({
                    CONT_NAME: this.state.CONT_NAME_LAST + this.state.CONT_NAME_FIRST,
                })
            }
        })
    }
    changeTel = e => {
        const { handleChangeTel } = this.props
        const { name, value } = e.target
        console.log('props', this.props)
        console.log(e.target.name)
        this.setState({ [name]: value }, () => {
            if (typeof handleChangeTel === 'function') {
                let props = {}
                if (name.indexOf('CONT_') > -1) {
                    props = { contTel: `${this.state.CONT_TEL_AREA}-${this.state.CONT_TEL}` }
                } else {
                    props = { tel1: `${this.state.TEL_AREA}-${this.state.TEL}` }
                }
                handleChangeTel(props)
            }
        })
    }
    render() {
        let widthClass = this.props.controlType === 'textarea' ? 'address' : ''
        return (
            <div className={'form-control ' + widthClass}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                {this.props.controlType === 'textarea' ? (
                    [
                        <Count key={0} value={this.props.value} maxLength="500" />,
                        <textarea
                            key={1}
                            rows={this.props.rows}
                            id={this.props.id}
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
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    data-valid={item.validName}
                                    key={item.name}
                                    onChange={this.changeTel}
                                    maxLength={item.max}
                                />
                            ))}
                    </div>
                ) : this.props.id === 'CONT_NAME' ? (
                    <div className="input-container">
                        {this.props.subName &&
                            this.props.subName.map(item => (
                                <input
                                    name={item.name}
                                    data-valid={item.validName}
                                    id={item.id}
                                    key={item.name}
                                    placeholder={item.placeholder}
                                    onChange={this.changeName}
                                    maxLength={item.max}
                                    handleChangeName={item.handleChangeName}
                                />
                            ))}
                    </div>
                ) : (
                    <input
                        type={this.props.type}
                        name={this.props.name}
                        data-valid={this.props.validName}
                        id={this.props.id}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        maxLength={this.props.max}
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
