import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../UI/Dropdown'

export default class County extends PureComponent {
    static propTypes = {
        changeCounty: PropTypes.func,
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.string),
        value: PropTypes.string,
        fieldName: PropTypes.string,
    }

    render() {
        const { data, fieldName, className } = this.props
        const counties = data.map(v => v)

        return (
            <Dropdown
                name={this.props.name}
                className={className}
                value={this.props.value}
                changeCounty={this.props.changeCounty}
                options={counties}
                placeholder="縣市"
            ></Dropdown>
        )
    }
}
