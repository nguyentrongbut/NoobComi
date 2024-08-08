import { ComponentProps } from "react";

const IconSuccess = (props: ComponentProps<"svg">) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500 my-auto"
            {...props}
        >
            <path d="M5 12l5 5l10 -10"></path>
        </svg>
    );
};

export default IconSuccess;
