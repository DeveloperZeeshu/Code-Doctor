import React, { useId } from "react"

const Select = React.forwardRef(({
    label = '',
    options,
    className = '',
    ...props
}, ref) => {
    const id = useId()
    return (
        <>
            <label
                htmlFor={id}
                className="pb-[.8rem]">
                {label}
            </label>

            <select
                id={id}
                className={`bg-[#282828] text-[1.6rem] w-full rounded-[.6rem] focus:outline-none px-[1rem] py-4 cursor-pointer max-w-full overflow-x-hidden ${className}`}
                {...props}
                ref={ref}>
                {
                    options.map(option => (
                        <option
                            key={option}
                            value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </>
    )
})

export default Select

