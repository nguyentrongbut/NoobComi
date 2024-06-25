"use client";
import IconArrowDown from "@/components/icon/icon.arrow.down";
import IconCup from "@/components/icon/icon.cup";
import IconLight from "@/components/icon/icon.light";
import IconMoney from "@/components/icon/icon.money";
import IconPage from "@/components/icon/icon.page";
import IconUpload from "@/components/icon/icon.upload";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

// Create a list of dropdown(hover) "More" navbar links to display
const navMoreLinks = [
    {
        title: "Creators",
        icon: IconLight,
        desc: "Build your fandom on MangaNoob",
        href: "/creators",
    },
    {
        title: "News",
        icon: IconPage,
        desc: "The latest on anime, manga and games",
        href: "/news",
    },
    {
        title: "Contests",
        icon: IconCup,
        desc: "Monthly contests, big prizes",
        href: "/contests",
    },
    {
        title: "Publish",
        icon: IconUpload,
        desc: "Unlock your potential with MangaNoob",
        href: "/publish",
    },
    {
        title: "Make Money",
        icon: IconMoney,
        desc: "Earn money with MangaNoob",
        href: "/makemoney",
    },
];

const DropdownHeader = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className="hover:bg-neutral-200 rounded-md">
                    <NavigationMenuTrigger className="flex text-base font-medium px-4 py-2 cursor-pointer bg-transparent">
                        <div className="flex gap-1">
                            <span>More</span>
                            <IconArrowDown></IconArrowDown>
                        </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="w-[448px]">
                            {/* Map through the navMoreLinks array to display each dropdown link */}
                            {navMoreLinks.map((navMoreLink) => {
                                // Assign the icon in list to LinkIcon
                                const LinkIcon = navMoreLink.icon;
                                return (
                                    <div
                                        key={navMoreLink.desc}
                                        className="line-clamp-1"
                                    >
                                        <Link
                                            href={navMoreLink.href}
                                            className="group flex gap-4 items-center py-2 px-4 cursor-pointer hover:bg-neutral-100 transition"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-neutral-50 group-hover:bg-white transition">
                                                <LinkIcon className="text-neutral-500 group-hover:text-[#05aaf0] transition"></LinkIcon>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    {navMoreLink.title}
                                                </span>
                                                <p className="text-neutral-500 mt-1 font-medium">
                                                    {navMoreLink.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default DropdownHeader;
