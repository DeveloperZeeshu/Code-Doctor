import React from "react"

const Button = React.forwardRef(({
    children,
    type = 'button',
    text = 'Submit',
    className = '',
    ...props
}, ref) => {
    return <button
        className={`text-[1.6rem] px-[1.5rem] py-3.5 bg-[purple] rounded-[.8rem] cursor-pointer hover:bg-[#800080cd] ${className}`}
        type={type}
        ref={ref}
        {...props}
    >
        {children || text}
    </button>
})

export default Button


