const IconFilter = ({ width = 24, height = 24, strokeWidth = 2, color = "currentColor",  className = ""}) => {
    return (
        <svg
            data-v-b8aef6c3=""
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
        >
            <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M4 6l8 0"></path>
            <path d="M16 6l4 0"></path>
            <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M4 12l2 0"></path>
            <path d="M10 12l10 0"></path>
            <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M4 18l11 0"></path>
            <path d="M19 18l1 0"></path>
        </svg>
    );
};

export default IconFilter;
