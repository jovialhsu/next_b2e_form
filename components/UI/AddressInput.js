import React, { useState } from 'react'
import TWZipCode from '../helpers/TWZipCode'
import PropTypes from 'prop-types'
import classNames from 'classnames'
const AddressInput = props => {
    const [open, setOpen] = useState(false)
    const openHandler = open => {
        setOpen(open)
    }
    const classes = classNames({
        'is-open': open,
        invalid: !props.valid[3],
    })
    return (
        <div className="form-control address">
            <div className="input-container">
                <TWZipCode
                    handleChangeCounty={props.handleChangeCounty}
                    onChange={props.onChange}
                    name={props.name.slice(0, 3)}
                    value={props.value.slice(0, 3)}
                    valid={props.valid.slice(0, 3)}
                    openHandler={openHandler}
                />
                <input
                    className={!props.valid[3] ? 'invalid' : ''}
                    type={props.type}
                    name={props.name[3]}
                    data-valid={props.validName}
                    placeholder="村里/道路/街名/門號/樓層"
                    onChange={props.onChange}
                    maxLength={props.max}
                    defaultValue={props.value[0] + props.value[1]}
                />
                <label className={classes} htmlFor={props.name[3]}>
                    {props.label}
                </label>
            </div>
            {props.validityMessage && !props.valid[3] ? <p className="error-message">{props.validityMessage}</p> : ''}
        </div>
    )
}

export default AddressInput
