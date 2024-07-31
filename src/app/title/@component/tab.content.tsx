import { TTabContent } from "@/types";

const TabContent = ({children}:TTabContent) => {
    return (
        <article className="mt-4 lg:mt-6">
            <div className="sm:px-4 lg:px-8">
                <div className="wrapper bg-white">
                    <div className="rounded-none sm:rounded-md shadow-none sm:shadow lg:p-6 h-auto">
                        {children}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default TabContent;
