import React, { Component } from 'react'
import TWZipCode from '../helpers/TWZipCode'
export default class AddressInput extends Component {
    render() {
        return (
            <div className="address">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div className="input-container">
                    <TWZipCode
                        handleChangeCounty={this.props.handleChangeCounty}
                        onChange={this.props.onChange}
                        syncChange={this.props.syncChange}
                        name={this.props.name.slice(0, 3)}
                        id={this.props.id.slice(0, 3)}
                        value={this.props.value.slice(0, 3)}
                    />
                </div>
                <input
                    type={this.props.type}
                    name={this.props.name[3]}
                    data-valid={this.props.validName}
                    id={this.props.id[3]}
                    placeholder="村里/道路/街名/門號/樓層"
                    onChange={this.props.onChange}
                    maxLength={this.props.max}
                    defaultValue={this.props.value[0] + this.props.value[1]}
                />
                {this.props.validityMessage && !this.props.valid ? (
                    <p className="error-message">{this.props.validityMessage}</p>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
