import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Data from '../utils/ZipData';

export default class ZipCode extends PureComponent {
    static propTypes = {
        changeZipcode: PropTypes.func,
        className: PropTypes.string,
        value: PropTypes.string,
        fieldName: PropTypes.string,
        placeholder: PropTypes.string,
    };

    onChange = (e) => {
        const zipCode = e.target.value;
        console.log(e.target);
        this.props.changeZipcode(zipCode);
        this.props.onChange(e.target);

        if (zipCode.length === 3) {
            Object.keys(Data).forEach((i) => {
                Object.keys(Data[i]).some((j) => {
                    if (zipCode === Data[i][j]) {
                        return this.props.changeZipcode(zipCode);
                    }

                    return false;
                });
            });
        }
    };

    render() {
        // if (this.props.ZipCodeValue === '') {
        //     this.props = {
        //         value: '',
        //         writable: true,
        //     };
        // }
        return (
            <input
                type="text"
                className={this.props.className}
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                maxLength="3"
                //onChange={this.props.onChange}
                zipcodevalue={this.props.value}
            />
        );
    }
}
