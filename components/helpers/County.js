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
        const {
            data,
            fieldName,
            className,
            //value,
        } = this.props
        //console.log(this.props.value)
        const counties = data.map(v => v)

        return (
            <Dropdown
                name={this.props.name}
                className={className}
                // onClick={this.onChange}
                value={this.props.value}
                changeCounty={this.props.changeCounty}
                options={counties}
                // onChange={this.props.onChange}
                placeholder="縣市"
            ></Dropdown>
        )
    }
}
