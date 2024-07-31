"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabTitle = [
    { title: "Chapters", href: "/" },
    { title: "Comments", href: "/comments" },
    { title: "Reviews", href: "/reviews" },
];

const Tab = (props: any) => {
    const pathname = usePathname();

    const { params } = props;
    // Regex để kiểm tra nếu pathname chỉ chứa params
    const isRootPath = new RegExp(`^/title/${params}/?$`).test(pathname);
    
    return (
        <section className="bg-white">
            <div className="wrapper">
                <nav className="flex text-sm sm:text-base px-4 sm:px-0 select-none">
                    {tabTitle.map((item) => {
                        const isActive =
                            item.href === "/"
                                ? isRootPath
                                : pathname.endsWith(item.href);

                        return (
                            <Link
                                key={item.title}
                                href={`/title/${params}/${item.href}`}
                                className={`px-4 py-2 block min-w-[6rem] text-center flex-shrink-0 hover:opacity-90 transition-opacity ${
                                    isActive
                                        ? "border-b-2 border-blue-600 font-bold"
                                        : "font-medium opacity-50"
                                }`}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </section>
    );
};

export default Tab;
