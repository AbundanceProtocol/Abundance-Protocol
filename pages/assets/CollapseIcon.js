
const CollapseIcon = (props) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M20.125 9.5H3.875C2.83984 9.5 2 10.3398 2 11.375V12.625C2 13.6602 2.83984 14.5 3.875 14.5H20.125C21.1602 14.5 22 13.6602 22 12.625V11.375C22 10.3398 21.1602 9.5 20.125 9.5Z" fill={props.color ?? "black"}/>
        </svg>
    )
}

export default CollapseIcon