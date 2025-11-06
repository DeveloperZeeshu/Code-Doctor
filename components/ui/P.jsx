const P = ({
    text = '',
    ...props
}) => {
    return (
        <p
            className="text-[1.5rem] lg:text-[1.8rem] text-center pb-[4rem] text-[#a1a0a0d6]"
            {...props}>
            {text}
        </p>
    )
}

export default P
