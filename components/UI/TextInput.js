import React, { Component } from 'react';
import Count from './Count';

export default class TextInput extends Component {
    constructor(props) {
        super();
        // this.state = {
        //     controlType : null,
        //     id: '',
        //     label:'',
        //     rows:null,
        //     value:'',
        //     type:'text',
        //     valid:true,
        //     validityMessage:'',
        // }
    }
    render() {
        let widthClass = this.props.controlType === 'textarea' ? 'address' : '';
        return (
            <div className={'form-control ' + widthClass}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                {this.props.controlType === 'textarea' ? (
                    [
                        <Count
                            key={0}
                            value={this.props.value}
                            maxLength="500"
                        />,
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
                            this.props.name.map((item) => (
                                <input
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    data-valid={item.validName}
                                    key={item.name}
                                    onChange={item.onChange}
                                    maxLength={item.max}
                                />
                            ))}
                    </div>
                ) : this.props.id === 'CONT_NAME' ? (
                    <div className="input-container">
                        {this.props.name &&
                            this.props.name.map((item) => (
                                <input
                                    name={item.name}
                                    data-valid={item.validName}
                                    id={item.id}
                                    key={item.name}
                                    placeholder={item.placeholder}
                                    onChange={item.onChange}
                                    maxLength={item.max}
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
                    <p className="error-message">
                        {this.props.validityMessage}
                    </p>
                ) : (
                    ''
                )}
            </div>
        );
    }
}
