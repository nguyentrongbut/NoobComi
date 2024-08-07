import { ComponentProps } from "react";

const IconDiscover = (props: ComponentProps<"svg">) => {
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
            {...props}
        >
            <path d="M8 16l2 -6l6 -2l-2 6l-6 2"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 3l0 2"></path>
            <path d="M12 19l0 2"></path>
            <path d="M3 12l2 0"></path>
            <path d="M19 12l2 0"></path>
        </svg>
    );
};

export default IconDiscover;
