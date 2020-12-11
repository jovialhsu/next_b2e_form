import React, { useState } from 'react'
import Dropdown from './Dropdown'
import classNames from 'classnames'

const SelectInput = props => {
    const [open, setOpen] = useState(false)
    const openHandler = open => {
        setOpen(open)
    }
    const classes = classNames({
        'is-open': open,
        invalid: !props.valid,
    })
    return (
        <div className="form-control">
            <label className={classes} htmlFor={props.name}>
                {props.label}
            </label>
            <Dropdown
                options={props.options}
                placeholder={props.placeholder}
                onChange={props.onChange}
                name={props.name}
                value={props.value}
                valid={props.valid}
                openHandler={openHandler}
            ></Dropdown>
            {props.validityMessage && !props.valid ? <p className="error-message">{props.validityMessage}</p> : ''}
        </div>
    )
}

export default SelectInput
