import IconDiscord from "@/components/icon/icon.discord";
import IconFacebook from "@/components/icon/icon.facebook";
import IconInstagram from "@/components/icon/icon.instagram";
import IconLinkedIn from "@/components/icon/icon.linkedin";
import IconTwitter from "@/components/icon/icon.twitter";
import Link from "next/link";

const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Terms", href: "/terms" },
    { title: "Help", href: "/help" },
    { title: "Apps", href: "/apps" },
];

const socialLinks = [
    {
        icon: IconDiscord,
        href: "https://discord.com",
        title: "go to MangaNoob's discord",
    },
    {
        icon: IconFacebook,
        href: "https://facebook.com",
        title: "go to MangaNoob's facebook",
    },
    {
        icon: IconInstagram,
        href: "https://instagram.com",
        title: "go to MangaNoob's instagram",
    },
    { icon: IconTwitter, href: "https://x.com", title: "go to MangaNoob's x" },
    {
        icon: IconLinkedIn,
        href: "https://vn.linkedin.com",
        title: "go to MangaNoob's linkedin",
    },
];

const AppFooter = () => {
    return (
        <footer className="text-sm sm:text-base bg-neutral-50 text-neutral-700 mb-16 md:mb-0">
            <div className="wrapper py-12">
                <nav className="flex flex-wrap justify-center">
                    {footerLinks.map((item) => {
                        return (
                            <div key={item.href} className="px-4 py-2">
                                <Link
                                    href={item.href}
                                    className="px-2 py-1 block hover:bg-neutral-200 rounded-md"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        );
                    })}
                </nav>
                <ul className="flex flex-wrap justify-center items-center gap-4 mt-6 md:mt-8">
                    {socialLinks.map((item) => {
                        const LinkIcon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    target="_blank"
                                    className="p-1 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:bg-neutral-200 rounded-md"
                                    title={item.title}
                                >
                                    <LinkIcon></LinkIcon>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className="text-center mt-6 md:mt-8">© 2024 MangaNoob</p>
            </div>
        </footer>
    );
};

export default AppFooter;
