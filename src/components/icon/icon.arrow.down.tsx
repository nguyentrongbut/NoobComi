const IconArrowDown = ({ width = 24, height = 24, strokeWidth = 2, color = "currentColor",  className = ""}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`tabler-icon tabler-icon-chevron-down ${className}`}
        >
            <path d="M6 9l6 6l6 -6"></path>
        </svg>
    );
};

export default IconArrowDown;
