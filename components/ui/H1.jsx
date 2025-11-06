const H1 = ({
    text = 'Heading',
    ...props
}) => {
    return (
        <h1
            className="text-center text-[3rem] lg:text-[4rem] font-[400] text-[#fff]"
            {...props}>
            {text}
        </h1>
    )
}

export default H1
