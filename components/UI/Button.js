import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ label, isLoading, size, variant, type, ...props }) => {
    const btnVariant = ['primary', 'orange', 'gray'].includes(variant) ? `btn-${variant}` : 'btn-primary'
    const btnSize = ['sm', 'md', 'lg'].includes(size) ? `btn-${size}` : `btn-lg`
    const btnLoading = isLoading ? 'btn-loading' : ''
    return (
        <button type={type} className={['ez-btn', btnVariant, btnSize, btnLoading].join(' ').trim()} {...props}>
            {label}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'orange', 'gray']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
}
Button.defaultProps = {
    isLoading: false,
    size: 'lg',
    variant: 'primary',
    type: 'button',
}

export default Button
