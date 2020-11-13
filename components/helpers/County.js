import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../UI/Dropdown';

export default class County extends PureComponent {
    static propTypes = {
        changeCounty: PropTypes.func,
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.string),
        value: PropTypes.object,
        fieldName: PropTypes.string,
    };

    onChange = (e) => {
        console.log('e');
    };

    render() {
        const {
            data,
            fieldName,
            className,
            //value,
        } = this.props;

        const counties = data.map((v) => v);

        return (
            <Dropdown
                name={fieldName}
                className={className}
                // onClick={this.onChange}
                value={this.props.value}
                changeCounty={this.props.changeCounty}
                options={counties}
                placeholder="縣市"
            ></Dropdown>
        );
    }
}
