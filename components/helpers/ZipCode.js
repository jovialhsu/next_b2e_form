import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Data from '../utils/ZipData'

export default class ZipCode extends PureComponent {
    static propTypes = {
        changeZipcode: PropTypes.func,
        className: PropTypes.string,
        value: PropTypes.string,
        fieldName: PropTypes.string,
        placeholder: PropTypes.string,
    }

    onChange = e => {
        const zipCode = e.target.value
        this.props.changeZipcode(zipCode)
        if (zipCode.length === 3) {
            Object.keys(Data).forEach(i => {
                Object.keys(Data[i]).some(j => {
                    if (zipCode === Data[i][j]) {
                        return this.props.changeZipcode(zipCode)
                    }
                    return false
                })
            })
        }
        this.props.onChange(e)
    }

    render() {
        return (
            <input
                type="text"
                className={(this.props.className, !this.props.valid ? 'invalid' : '')}
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                maxLength="3"
                zipcodevalue={this.props.value}
                readOnly={true}
            />
        )
    }
}
