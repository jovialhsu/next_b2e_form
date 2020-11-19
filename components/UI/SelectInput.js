import React, { Component } from 'react'
import Dropdown from './Dropdown'

export default class SelectInput extends Component {
    // componentDidUpdate(prevProps) {
    //     console.log('componentDidUpdate', this.props.value, prevProps);
    //     if (this.props.value !== prevProps.value) {
    //         if (this.props.value) {
    //             let selected = this.parseValue(
    //                 this.props.value,
    //                 this.props.options
    //             );
    //             if (selected !== this.state.selected) {
    //                 this.setState({ selected });
    //             }
    //         } else {
    //             this.setState({
    //                 selected: {
    //                     label:
    //                         typeof this.props.placeholder === 'undefined'
    //                             ? '請選擇'
    //                             : this.props.placeholder,
    //                     value: '',
    //                     name:
    //                         typeof this.props.name === 'undefined'
    //                             ? ''
    //                             : this.props.name,
    //                 },
    //             });
    //         }
    //     }
    // }
    // parseValue(value, options) {
    //     let option;

    //     if (typeof value === 'string') {
    //         for (var i = 0, num = options.length; i < num; i++) {
    //             if (options[i].type === 'group') {
    //                 const match = options[i].items.filter(
    //                     (item) => item.value === value
    //                 );
    //                 if (match.length) {
    //                     option = match[0];
    //                 }
    //             } else if (
    //                 typeof options[i].value !== 'undefined' &&
    //                 options[i].value === value
    //             ) {
    //                 option = options[i];
    //             }
    //         }
    //     }

    //     return option || value;
    // }
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
