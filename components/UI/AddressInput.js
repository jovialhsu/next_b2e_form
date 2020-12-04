import React, { Component } from 'react'
import TWZipCode from '../helpers/TWZipCode'
import PropTypes from 'prop-types'
export default class AddressInput extends Component {
    render() {
        return (
            <div className="address">
                <label>
                    {this.props.label}
                    {this.props.valid}
                </label>
                <div className="input-container">
                    <TWZipCode
                        handleChangeCounty={this.props.handleChangeCounty}
                        onChange={this.props.onChange}
                        name={this.props.name.slice(0, 3)}
                        value={this.props.value.slice(0, 3)}
                        valid={this.props.valid.slice(0, 3)}
                    />
                </div>
                <input
                    className={!this.props.valid[3] ? 'invalid' : ''}
                    type={this.props.type}
                    name={this.props.name[3]}
                    data-valid={this.props.validName}
                    placeholder="村里/道路/街名/門號/樓層"
                    onChange={this.props.onChange}
                    maxLength={this.props.max}
                    defaultValue={this.props.value[0] + this.props.value[1]}
                />
                {this.props.validityMessage && !this.props.valid[3] ? (
                    <p className="error-message">{this.props.validityMessage}</p>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
