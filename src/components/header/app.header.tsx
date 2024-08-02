import Link from "next/link";
import IconEmail from "@/components/icon/icon.email";
import IconBell from "@/components/icon/icon.bell";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import empty from "../../../public/images/empty.png";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import IconSetting from "@/components/icon/icon.setting";
import IconPencil from "@/components/icon/icon.pencil";
import IconHelp from "@/components/icon/icon.help";
import IconSubscription from "@/components/icon/icon.subscriptions";
import IconLogOut from "@/components/icon/icon.log.out";
import HeaderSearch from "@/components/header/header.search";
import DropdownHeader from "@/components/header/dropdown.header";
import IconUserClient from "@/components/icon/icon.user.client";
import IconLogIn from "@/components/icon/icon.log.in";
import IconSignUp from "@/components/icon/icon.sign.up";

// Create a list of navbar links to display
const navLinks = [
    { title: "Library", href: "/library", key: "Library-240612" },
    { title: "Discover", href: "/discover", key: "Discover-240612" },
];

// items dropdown menu account
const listChoose = [
    {
        title: "Login",
        icon: IconLogIn,
        href: "/login",
        key: "Login-240612",
    },
    {
        title: "Sign up",
        icon: IconSignUp,
        href: "/signup",
        key: "Sign-up-240612",
    },
    {
        title: "Subscriptions",
        icon: IconSubscription,
        href: "/subscriptions",
        key: "Subscriptions-240612",
    },
    {
        title: "MangaNoob Studio",
        icon: IconPencil,
        href: "/studio",
        key: "Studio-240612",
    },
    {
        title: "Help",
        icon: IconHelp,
        href: "/help",
        key: "Help-240612",
    },
];
const AppHeader = () => {
    return (
        <header className="shadow sticky top-0 left-0 right-0 backdrop-blur-lg bg-white/80 z-50">
            <div className="flex justify-between wrapper items-center h-16">
                <div className="flex gap-4 items-center">
                    <div>
                        {/* Logo */}
                        <Link href="/">
                            <p className="font-bold text-xl">MangaNoob</p>
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex">
                            {/* Map through the navLink array to display each link */}
                            {navLinks.map((navLink) => {
                                return (
                                    <li key={navLink.key}>
                                        <Link
                                            href={navLink.href}
                                            className="font-medium px-4 py-2 block hover:bg-neutral-200 rounded-md"
                                        >
                                            {navLink.title}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li>
                                {/* hover-card shadcn/ui */}
                                <DropdownHeader></DropdownHeader>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="relative flex gap-2 lg:w-128 xl:w-176 items-center">
                    {/* Search */}
                    <HeaderSearch></HeaderSearch>

                    {/* Action Group */}
                    <div className="flex gap-2">
                        {/* Mail */}
                        {/* <Link
                            href="/messages"
                            className="flex mw-400 w-10 h-10 cursor-pointer rounded-full justify-center items-center hover:bg-neutral-100"
                        >
                            <IconEmail className="my-auto"></IconEmail>
                        </Link> */}

                        {/* popover notification shadcn/ui */}
                        {/* <Popover>
                            <PopoverTrigger className="flex mw-400 w-10 h-10 cursor-pointer rounded-full justify-center items-center hover:bg-neutral-100 outline-none">
                                <IconBell className="my-auto"></IconBell>
                            </PopoverTrigger>
                            <PopoverContent
                                align="end"
                                className="mw-400 sm:w-[630px] p-4 mt-[7px]"
                            >
                                <div className="mb-16 sm:mb-32 w-full">
                                    <h2 className="text:md xl:text-lg font-medium mb-4">
                                        Notifications
                                    </h2>
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={empty}
                                            alt="U don't have any notifications"
                                            className="w-48 h-48"
                                        ></Image>
                                        <p className="text-center text-sm md:text-base">
                                            You do not have any notifications
                                        </p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover> */}

                        {/* popover account shadcn/ui */}
                        <Popover>
                            <PopoverTrigger className="outline-none w-10 h-10 rounded-full overflow-hidden">
                                {/* Member */}
                                {/* <Image
                                    src={avatar}
                                    alt="avatar"
                                    className="object-cover"
                                ></Image> */}
                                {/* User Client */}
                                <div title="User"></div>
                                <IconUserClient></IconUserClient>
                            </PopoverTrigger>
                            <PopoverContent className="mt-1 p-0 w-fit shadow-lg">
                                {/* <Link
                                    href="/user"
                                    className="flex gap-2 p-2 hover:bg-neutral-100"
                                >
                                    <div className="outline-none w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                                        <Image
                                            src={avatar}
                                            alt="avatar"
                                            className="object-cover"
                                        ></Image>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm sm:text-base font-bold line-clamp-1 max-w-[150px]">
                                            Manga noob
                                        </span>
                                        <span className="text-xs sm:text-sm opacity-70 line-clamp-1 max-w-[150px]">
                                            @manga noob
                                        </span>
                                    </div>
                                </Link>
                                <Separator className="mb-1" /> */}
                                {/* Map through the listChoose array to display each items dropdown menu account */}
                                {listChoose.map((item, index) => {
                                    // Assign the icon in list to LinkIcon
                                    const LinkIcon = item.icon;
                                    if (index < 2) {
                                        return (
                                            <div key={item.key}>
                                                <Link href={item.href}>
                                                    <div className="flex gap-1 py-2 px-4 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 active:text-black">
                                                        <LinkIcon className="mr-3 flex-shrink-0"></LinkIcon>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                </Link>
                                                {index === 1 && (
                                                    <Separator className="mt-1 mb-1" />
                                                )}
                                            </div>
                                        );
                                    }
                                    // if (index > 1) {
                                    //     return (
                                    //         <div key={item.key}>
                                    //             <Link href={item.href}>
                                    //                 <div className="flex gap-[2px] sm:gap-1 py-2 px-4 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 active:text-black items-center">
                                    //                     <LinkIcon className="mr-3 flex-shrink-0"></LinkIcon>
                                    //                     <span className="text-sm sm:text-base">
                                    //                         {item.title}
                                    //                     </span>
                                    //                 </div>
                                    //             </Link>
                                    //             {/* Display separator when reaching the 2nd and 4th items */}
                                    //             {(index === 1 ||
                                    //                 index === 3) && (
                                    //                 <Separator className="mt-1 mb-1" />
                                    //             )}
                                    //         </div>
                                    //     );
                                    // }
                                })}

                                {/* Setting */}
                                <div>
                                    <Link href="/setting">
                                        <div className="text-sm sm:text-base flex gap-1 py-2 px-4 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 active:text-black items-center">
                                            <IconSetting className="mr-3 flex-shrink-0"></IconSetting>
                                            <span>Setting</span>
                                        </div>
                                    </Link>
                                </div>
                                {/* <Separator className="mt-1 mb-1" /> */}
                                {/* Log Out */}
                                {/* <Link href="/">
                                    <div className="text-sm sm:text-base flex gap-1 py-2 px-4 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 active:text-black items-center">
                                        <IconLogOut></IconLogOut>
                                        <span>Log Out</span>
                                    </div>
                                </Link> */}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
