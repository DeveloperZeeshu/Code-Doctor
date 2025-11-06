import React, { useId } from "react"

const Input = React.forwardRef(({
    label = '',
    type = 'text',
    placeholder = '',
    errors,
    className,
    ...props
}, ref) => {
    const id = useId()
    return (
        <div>
            <label
                htmlFor={id}
                className="text-[1.5rem] lg:text-3xl mb-6">
                {label}
            </label>

            <input
                type={type}
                id={id}
                className={`bg-[#282828] text-[1.6rem] rounded-[.8rem] p-[1rem] w-full focus:outline-none ${className}`}
                placeholder={placeholder}
                ref={ref}
                {...props}
            />

            {errors && <p className="text-red-500 text-xl pt-3">{errors.message}</p>}
        </div>
    )
})

export default Input

