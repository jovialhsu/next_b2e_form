import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../UI/Dropdown'

export default class District extends PureComponent {
    static propTypes = {
        changeDistrict: PropTypes.func,
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.string),
        value: PropTypes.string,
        fieldName: PropTypes.string,
    }

    render() {
        const { data, className } = this.props
        const districts = !!data ? data.map(v => v) : []

        return (
            <Dropdown
                name={this.props.name}
                className={className}
                changeDistrict={this.props.changeDistrict}
                onChange={this.props.onChange}
                valid={this.props.valid}
                value={this.props.value}
                openHandler={this.props.openHandler}
                options={districts}
                placeholder="鄉鎮市區"
            ></Dropdown>
        )
    }
}
