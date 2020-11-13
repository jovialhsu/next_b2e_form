import React from 'react'

export default function FormContainer(props) {
    return (
        <>
            <h3 data-seq={props.index}>{props.subtitle}</h3>
            <div className="form-container">{props.children}</div>
        </>
    )
}
