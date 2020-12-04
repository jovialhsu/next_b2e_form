import React, { Component } from 'react'
import Dropdown from './Dropdown'

export default class SelectInput extends Component {
    render() {
        return (
            <div className="form-control">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <Dropdown
                    options={this.props.options}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    value={this.props.value}
                    valid={this.props.valid}
                ></Dropdown>
                {this.props.validityMessage && !this.props.valid ? (
                    <p className="error-message">{this.props.validityMessage}</p>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
