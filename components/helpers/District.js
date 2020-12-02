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
        const { data, fieldName, className } = this.props
        const districts = !!data ? data.map(v => v) : []

        return (
            <Dropdown
                name={this.props.name}
                className={className}
                changeDistrict={this.props.changeDistrict}
                value={this.props.value}
                options={districts}
                placeholder="鄉鎮市區"
            ></Dropdown>
        )
    }
}
