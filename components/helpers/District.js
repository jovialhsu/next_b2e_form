import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../UI/Dropdown';

export default class District extends PureComponent {
    static propTypes = {
        changeDistrict: PropTypes.func,
        className: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.string),
        value: PropTypes.string,
        fieldName: PropTypes.string,
    };

    // onChange = (e) => {
    //     const currentDistrict = e.target.value;
    //     console.log('傳遞的district',e.target.value)
    //     this.props.changeDistrict(currentDistrict);
    // };

    render() {
        const {
            data,
            fieldName,
            className,
            //value,
        } = this.props;
     //console.log('地區',this.props.value)
            const districts =!!data ? data.map((v) =>v):[];
        

        return (
            <Dropdown
                name={fieldName}
                className={className}
                changeDistrict={this.props.changeDistrict}
                value={this.props.value}
                options={districts}
                placeholder='鄉鎮市區'
            >
                
            </Dropdown>
        );
    }
}