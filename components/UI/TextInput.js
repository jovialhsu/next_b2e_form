import React, { Component } from 'react'
import { isEmpty } from '../helpers/validation'
import Count from './Count'

export default class TextInput extends Component {
    constructor(props) {
        super(props)
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
        let widthClass = this.props.controlType === 'textarea' ? 'address textarea' : ''
        return (
            <div className={'form-control ' + widthClass}>
                <div className="input-container" key={this.props.tab + 'input'} tabIndex={this.props.tab}>
                    {this.props.controlType === 'textarea'
                        ? [
                              <Count key={'0' + this.props.name} value={this.props.value} maxLength="500" />,
                              <textarea
                                  key={'1' + this.props.name}
                                  rows={this.props.rows}
                                  name={this.props.name}
                                  cols="30"
                                  onChange={this.props.onChange}
                                  defaultValue={this.props.defaultValue}
                                  maxLength="500"
                              ></textarea>,
                              <label
                                  key={'2' + this.props.name}
                                  htmlFor={this.props.name}
                                  className={!this.props.valid ? 'invalid' : ''}
                              >
                                  {this.props.label}
                              </label>,
                          ]
                        : this.props.controlType === 'tel'
                        ? [
                              <fieldset key={this.props.name + '3'}>
                                  {this.props.name &&
                                      this.props.name.map((item, i) => (
                                          <React.Fragment key={i + item.name + '1'}>
                                              <input
                                                  className={!item.valid ? 'invalid' : ''}
                                                  placeholder={item.placeholder}
                                                  name={item.name}
                                                  data-valid={item.validName}
                                                  key={item.name}
                                                  onChange={this.changeTel}
                                                  maxLength={item.max}
                                              />
                                              <label htmlFor={item.name} key={(i + 2) * 5}></label>
                                          </React.Fragment>
                                      ))}
                                  <legend key={this.props.name + '4'} className={!this.props.valid ? 'invalid' : ''}>
                                      {this.props.label}
                                  </legend>
                              </fieldset>,
                          ]
                        : this.props.name === 'contName'
                        ? [
                              <fieldset key={this.props.name + '5'}>
                                  {this.props.subName &&
                                      this.props.subName.map((item, i) => (
                                          <React.Fragment key={i + item.name + '2'}>
                                              <input
                                                  className={!item.valid ? 'invalid' : ''}
                                                  name={item.name}
                                                  data-valid={item.validName}
                                                  key={item.name}
                                                  placeholder={item.placeholder}
                                                  onChange={this.changeName}
                                                  maxLength={item.max}
                                              />
                                              <label htmlFor={item.name} key={(i + 3) * 2}></label>
                                          </React.Fragment>
                                      ))}
                                  <legend key={this.props.name + '6'} className={!this.props.valid ? 'invalid' : ''}>
                                      {this.props.label}
                                  </legend>
                              </fieldset>,
                          ]
                        : [
                              <React.Fragment key={this.props.name + '5'}>
                                  <input
                                      className={!this.props.valid ? 'invalid' : ''}
                                      type={this.props.type}
                                      name={this.props.name}
                                      data-valid={this.props.validName}
                                      placeholder={this.props.placeholder}
                                      onChange={this.props.onChange}
                                      maxLength={this.props.max}
                                  />
                                  <label htmlFor={this.props.name} className={!this.props.valid ? 'invalid' : ''}>
                                      {this.props.label}
                                  </label>
                              </React.Fragment>,
                          ]}
                </div>
                {this.props.validityMessage && !this.props.valid ? (
                    <p className="error-message">{this.props.validityMessage}</p>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
