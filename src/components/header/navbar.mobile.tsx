import IconDiscover from "@/components/icon/icon.discover";
import IconEmail from "@/components/icon/icon.email";
import IconHome from "@/components/icon/icon.home";
import IconLibrary from "@/components/icon/icon.library";
import IconMenuBar from "@/components/icon/icon.menubar";
import Link from "next/link";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import IconLight from "@/components/icon/icon.light";
import IconPage from "@/components/icon/icon.page";
import IconCup from "@/components/icon/icon.cup";
import IconUpload from "@/components/icon/icon.upload";
import IconMoney from "@/components/icon/icon.money";
import { Separator } from "@/components/ui/separator";

const navLinks = [
    {
        icon: IconHome,
        href: "/",
    },
    {
        icon: IconDiscover,
        href: "/discover",
    },
    {
        icon: IconEmail,
        href: "/messages",
    },
    {
        icon: IconLibrary,
        href: "/library",
    },
];

const navSideBarLinks = [
    {
        title: "Creators",
        icon: IconLight,
        href: "/creators",
    },
    {
        title: "News",
        icon: IconPage,
        href: "/news",
    },
    {
        title: "Contests",
        icon: IconCup,
        href: "/contests",
    },
    {
        title: "Publish",
        icon: IconUpload,
        href: "/publish",
    },
    {
        title: "Make Money",
        icon: IconMoney,
        href: "/makemoney",
    },
];
const NavbarMobile = () => {
    //pb-16
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white block md:hidden">
            <ul className="wrapper flex">
                {/* Map through the navLinks array to display each link */}
                {navLinks.map((item, index) => {
                    // Assign the icon in list to LinkIcon
                    const LinkIcon = item.icon;
                    return (
                        <li
                            key={item.href}
                            className="w-full hover:bg-neutral-100"
                        >
                            <Link
                                href={item.href}
                                className="w-full h-full py-5 flex items-center justify-center"
                            >
                                <LinkIcon></LinkIcon>
                            </Link>
                        </li>
                    );
                })}
                <li className="w-full hover:bg-neutral-100">
                    <div className="w-full h-full py-5 flex items-center justify-center">
                        <Sheet>
                            <SheetTrigger>
                                <IconMenuBar></IconMenuBar>
                            </SheetTrigger>
                            <SheetContent
                                side={"left"}
                                className="w-64 p-4 md:hidden"
                            >
                                <SheetHeader>
                                    <SheetTitle className="flex">
                                        <Link
                                            href="/"
                                            className="block pl-3 pt-1 pb-2"
                                        >
                                            MangaNoob
                                        </Link>
                                    </SheetTitle>
                                    <SheetDescription>
                                        <Separator></Separator>
                                        <ul className="flex flex-col gap-2 mt-3">
                                            {navSideBarLinks.map((item) => {
                                                // Assign the icon in list to LinkIcon
                                                const LinkIcon = item.icon;
                                                return (
                                                    <li
                                                        key={item.href}
                                                        className="rounded-md hover:bg-[#e5e5e5]"
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            className="flex gap-3 pl-3 py-2 items-center"
                                                        >
                                                            <LinkIcon></LinkIcon>
                                                            <p className="font-medium text-base text-[#737373]">
                                                                {item.title}
                                                            </p>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarMobile;
