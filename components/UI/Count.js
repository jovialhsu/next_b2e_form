import React, { useState, useEffect } from 'react'

function Count(props) {
    const [count, setCount] = useState(0)
    let countValue = !props.value ? 0 : props.value.length
    useEffect(() => {
        setCount(count => (count += countValue))
        return () => {
            setCount(count => 0)
        }
    }, [countValue])
    return (
        <>
            <span>
                {count}/{props.maxLength}
            </span>
        </>
    )
}

export default Count
