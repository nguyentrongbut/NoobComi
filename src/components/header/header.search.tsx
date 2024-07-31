"use client";
import IconFilter from "@/components/icon/icon.filter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import cover from "../../../public/images/cover.jpg";
import cover2 from "../../../public/images/cover2.jpg";
import banner from "../../../public/images/banner.png";
import avatar from "../../../public/images/avatar.png";
import { Separator } from "@/components/ui/separator";
import IconSearch from "@/components/icon/icon.search";
import IconArrowUp from "@/components/icon/icon.arrow.up";

const HeaderSearch = () => {
    // state when clicking on the search bar to display the search menu and apply search focus effect, adjust search width
    const [searchClick, setSearchClick] = useState(false);
    const [searchMobileClick, setSearchMobileClick] = useState(false);
    // state checks when hovering over the scrollbar of Title to display
    const [hoverTitle, setHoverTitle] = useState(false);
    // state checks when hovering over the scrollbar of Organizations to display.
    const [hoverOrganizations, setHoverOrganizations] = useState(false);
    // ref for the parent element wrapping the search bar and search menu.
    const searchHeaderRef = useRef<HTMLDivElement | null>(null);
    const searchHeaderMobileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // checks when clicking outside the search bar set state false
        const handleClickOutSearch = (e: MouseEvent) => {
            if (
                searchHeaderRef.current &&
                !searchHeaderRef.current.contains(e.target as Node)
            ) {
                setSearchClick(false);
            }
        };
        document.addEventListener("click", handleClickOutSearch);
        return () => {
            document.removeEventListener("click", handleClickOutSearch);
        };
    }, []);

    useEffect(() => {
        // checks when clicking outside the search bar set state false (close)
        const handleClickOutSearch = (e: MouseEvent) => {
            if (
                searchHeaderMobileRef.current &&
                searchHeaderRef.current &&
                !searchHeaderMobileRef.current.contains(e.target as Node) &&
                !searchHeaderRef.current.contains(e.target as Node)
            ) {
                setSearchMobileClick(false);
            }
        };
        document.addEventListener("click", handleClickOutSearch);
        return () => {
            document.removeEventListener("click", handleClickOutSearch);
        };
    }, []);

    // checks when clicking IconArrowUp the search bar set state false (close)
    const handleArrowUpClick = () => {
        setSearchMobileClick(false);
    };

    return (
        <div>
            <div
                className="xl:hidden px-2 cursor-pointer"
                ref={searchHeaderMobileRef}
                onClick={() => setSearchMobileClick(true)}
            >
                <IconSearch className="my-auto"></IconSearch>
            </div>
            <div
                className={`fixed top-0 left-0 right-0 z-10 xl:relative flex gap-3 ${
                    searchMobileClick ? "block bg-white" : "hidden xl:block"
                } p-5 xl:p-0`}
                ref={searchHeaderRef}
            >
                <div
                    // when the state is true, it has border-neutral and width of 270px (default)
                    className={`relative min-h-[40px] border w-full ${
                        !searchClick
                            ? "border-neutral-500 xl:w-[270px]"
                            : "border-[#05aaf0] xl:w-[504px]"
                    } bg-neutral-100 rounded-full overflow-hidden transition-w-b`}
                >
                    <input
                        type="text"
                        placeholder="Search"
                        className="absolute outline-none left-0 top-0 py-1 bg-neutral-100 px-4 h-full w-full"
                        // when clicked, set the state to true
                        onClick={() => setSearchClick(true)}
                    />
                    <Link
                        href="/search"
                        className="absolute right-2 top-0 h-full flex justify-center items-center w-[30px] cursor-pointer z-10"
                        title="filter"
                    >
                        <IconFilter className="my-auto pointer-events-none w-5 h-5"></IconFilter>
                    </Link>
                </div>
                <div
                    className="p-2 block xl:hidden"
                    onClick={handleArrowUpClick}
                >
                    <IconArrowUp className="my-auto text-red-400"></IconArrowUp>
                </div>
                {/* when state is true, display the search menu */}
                {searchClick && (
                    <div
                        className={`absolute p-2 right-0 top-16 xl:top-[48px] max-h-[32rem] w-full overflow-auto scroll-smooth xl:border xl:shadow-xl bg-white xl:bg-neutral-50 rounded-md`}
                    >
                        <p className="my-3 xl:my-4 text-center">
                            Please enter a search query.
                        </p>

                        {/*when have data will display*/}
                        {/* <div>
                            <p className="text-xl font-medium mb-4 mx-2">
                                Titles
                            </p>
                            <ul
                                className={`flex gap-4 mb-2 pb-2 mx-2 overflow-x-auto scroll-smooth ${
                                    hoverTitle ? "" : "scroll-bg"
                                }`}
                                // Set state when hovering out and hovering over the mouse
                                onMouseOut={() => setHoverTitle(false)}
                                onMouseOver={() => setHoverTitle(true)}
                            >
                                <li>
                                    <Link href="/k" className="w-[70px] block">
                                        <div className="h-[98px] hover-scale overflow-hidden hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                            <Image
                                                src={cover2}
                                                alt="cover"
                                                className="object-cover w-full h-full"
                                            ></Image>
                                        </div>
                                        <p className="line-clamp-2 mt-2 text-sm">
                                            Modern black blue bla bla
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="w-[70px] block">
                                        <div className="h-[98px] hover-scale overflow-hidden hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                            <Image
                                                src={cover}
                                                alt="cover"
                                                className="object-cover w-full h-full"
                                            ></Image>
                                        </div>
                                        <p className="line-clamp-2 mt-2 text-sm">
                                            Modern black blue bla bla
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="w-[70px] block">
                                        <div className="h-[98px] hover-scale overflow-hidden hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                            <Image
                                                src={cover}
                                                alt="cover"
                                                className="object-cover w-full h-full"
                                            ></Image>
                                        </div>
                                        <p className="line-clamp-2 mt-2 text-sm">
                                            Modern black blue bla bla
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="w-[70px] block">
                                        <div className="h-[98px] hover-scale overflow-hidden hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                            <Image
                                                src={cover}
                                                alt="cover"
                                                className="object-cover w-full h-full"
                                            ></Image>
                                        </div>
                                        <p className="line-clamp-2 mt-2 text-sm">
                                            Modern black blue bla bla
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="w-[70px] block">
                                        <div className="h-[98px] hover-scale overflow-hidden hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                            <Image
                                                src={cover2}
                                                alt="cover"
                                                className="object-cover w-full h-full"
                                            ></Image>
                                        </div>
                                        <p className="line-clamp-2 mt-2 text-sm">
                                            Modern black blue bla bla
                                        </p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/a" className="w-[70px] block">
                                        <div className="h-[98px] hover-scale overflow-hidden hover:scale-x-[1.03] hover:scale-y-[1.03]">
                                            <Image
                                                src={cover}
                                                alt="cover"
                                                className="object-cover w-full h-full"
                                            ></Image>
                                        </div>
                                        <p className="line-clamp-2 mt-2 text-sm">
                                            Modern black blue bla bla
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                            <Separator />
                            <p className="text-xl font-medium mb-4 mt-4 mx-2">
                                Organizations
                            </p>
                            <ul
                                className={`max-h-[700px] px-2 overflow-y-auto scroll-smooth sm:grid sm:grid-cols-2 sm:gap-4 xl:block ${
                                    hoverOrganizations ? "" : "scroll-bg"
                                }`}
                                // Set state when hovering out and hovering over the mouse
                                onMouseOut={() => setHoverOrganizations(false)}
                                onMouseOver={() => setHoverOrganizations(true)}
                            >
                                <li className="h-[192px] relative">
                                    <Link href="/b">
                                        <Image
                                            src={banner}
                                            alt="banner"
                                            className="h-[115px] rounded-md object-cover"
                                        ></Image>
                                        <div className="absolute left-4 bottom-0 -translate-y-1/2 flex gap-4">
                                            <Image
                                                src={avatar}
                                                alt="manga noob"
                                                width={96}
                                                height={96}
                                                className="object-cover rounded-md"
                                            ></Image>
                                            <p className="font-medium mt-auto line-clamp-1 max-w-[400px]">
                                                Manga Noob
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="h-[192px] relative">
                                    <Link href="/b">
                                        <Image
                                            src={banner}
                                            alt="banner"
                                            className="h-[115px] rounded-md object-cover"
                                        ></Image>
                                        <div className="absolute left-4 bottom-0 -translate-y-1/2 flex gap-4">
                                            <Image
                                                src={avatar}
                                                alt="manga noob"
                                                width={96}
                                                height={96}
                                                className="object-cover rounded-md"
                                            ></Image>
                                            <p className="font-medium mt-auto line-clamp-1 max-w-[400px]">
                                                Manga Noob
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="h-[192px] relative">
                                    <Link href="/b">
                                        <Image
                                            src={banner}
                                            alt="banner"
                                            className="h-[115px] rounded-md object-cover"
                                        ></Image>
                                        <div className="absolute left-4 bottom-0 -translate-y-1/2 flex gap-4">
                                            <Image
                                                src={avatar}
                                                alt="manga noob"
                                                width={96}
                                                height={96}
                                                className="object-cover rounded-md"
                                            ></Image>
                                            <p className="font-medium mt-auto line-clamp-1 max-w-[400px]">
                                                Manga Noob
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="h-[192px] relative">
                                    <Link href="/b">
                                        <Image
                                            src={banner}
                                            alt="banner"
                                            className="h-[115px] rounded-md object-cover"
                                        ></Image>
                                        <div className="absolute left-4 bottom-0 -translate-y-1/2 flex gap-4">
                                            <Image
                                                src={avatar}
                                                alt="manga noob"
                                                width={96}
                                                height={96}
                                                className="object-cover rounded-md"
                                            ></Image>
                                            <p className="font-medium mt-auto line-clamp-1 max-w-[400px]">
                                                Manga Noob
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                                <li className="h-[192px] relative">
                                    <Link href="/b">
                                        <Image
                                            src={banner}
                                            alt="banner"
                                            className="h-[115px] rounded-md object-cover"
                                        ></Image>
                                        <div className="absolute left-4 bottom-0 -translate-y-1/2 flex gap-4">
                                            <Image
                                                src={avatar}
                                                alt="manga noob"
                                                width={96}
                                                height={96}
                                                className="object-cover rounded-md"
                                            ></Image>
                                            <p className="font-medium mt-auto line-clamp-1 max-w-[400px]">
                                                Manga Noob
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                            <Separator />
                            <p className="text-xl font-medium mb-4 mt-4 mx-2">
                                Users
                            </p>
                            <ul className="mx-2">
                                <li className="mt-4">
                                    <Link
                                        href="/user"
                                        className="flex gap-2 pt-2 pb-2"
                                    >
                                        <div className="outline-none w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src={avatar}
                                                alt="avatar"
                                                className="object-cover"
                                            ></Image>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold line-clamp-1 max-w-[400px]">
                                                Manga noob
                                            </span>
                                            <span className="text-sm opacity-70 line-clamp-1 max-w-[400px]">
                                                @manga noob
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="mt-4">
                                    <Link
                                        href="/user"
                                        className="flex gap-2 pt-2 pb-2"
                                    >
                                        <div className="outline-none w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src={avatar}
                                                alt="avatar"
                                                className="object-cover"
                                            ></Image>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold line-clamp-1 max-w-[400px]">
                                                Manga noob
                                            </span>
                                            <span className="text-sm opacity-70 line-clamp-1 max-w-[400px]">
                                                @manga noob
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderSearch;
