import { ComponentProps } from "react";

const IconLoading = (props: ComponentProps<"svg">) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 primary-color animate-spin"
            {...props}
        >
            <path d="M7.5 4.21l0 .01"></path>
            <path d="M4.21 7.5l0 .01"></path>
            <path d="M3 12l0 .01"></path>
            <path d="M4.21 16.5l0 .01"></path>
            <path d="M7.5 19.79l0 .01"></path>
            <path d="M12 21l0 .01"></path>
            <path d="M16.5 19.79l0 .01"></path>
            <path d="M19.79 16.5l0 .01"></path>
            <path d="M21 12l0 .01"></path>
            <path d="M19.79 7.5l0 .01"></path>
            <path d="M16.5 4.21l0 .01"></path>
            <path d="M12 3l0 .01"></path>
        </svg>
    );
};

export default IconLoading;
