const IconPencil = ({ width = 24, height = 24, strokeWidth = 2, color = "currentColor",  className = ""}) => {
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
            className={className}
            aria-hidden="true"
        >
            <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path>
            <path d="M21 3a16 16 0 0 0 -12.8 10.2"></path>
            <path d="M21 3a16 16 0 0 1 -10.2 12.8"></path>
            <path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
        </svg>
    );
};

export default IconPencil;
