import { ComponentProps } from "react";

const IconUserClient = (props: ComponentProps<"svg">) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            data-v-fbfdbc4f=""
            {...props}
        >
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path>
            <path d="M22 22l-5 -5"></path>
            <path d="M17 22l5 -5"></path>
        </svg>
    );
};

export default IconUserClient;
