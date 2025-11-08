import React, { useId } from "react"

const TextArea = React.forwardRef(({
    label = '',
    className = '',
    placeholder = '',
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="text-[1.5rem] lg:text-3xl">
                {label}
            </label>

            <textarea
                className={`bg-[#282828] text-[1.6rem] w-full rounded-[.8rem] px-[1rem] py-[1.5rem] h-auto resize-none focus:outline-none mt-3 pb-[3rem] ${className}`}
                placeholder={placeholder}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default TextArea
