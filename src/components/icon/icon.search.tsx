import React from "react";

const IconSearch = ({ width = 24, height = 24, strokeWidth = 2, color = "currentColor",  className = ""}) => {
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
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
        </svg>
    );
};

export default IconSearch;
