"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdBugReport } from "react-icons/md";

const Navbar = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <nav className="flex space-x-5 px-5 border-b shadow-sm mb-5 h-14 items-center">
            <Link href="/">
                <MdBugReport size="2.5rem" />
            </Link>
            <ul className="flex gap-5 px-5">
                {links.map((l) => (
                    <li key={l.href}>
                        <Link
                            className={`${
                                currentPath === l.href
                                    ? "text-zinc-900"
                                    : "text-zinc-600"
                            } hover:text-zinc-800 transition-colors`}
                            href={l.href}
                        >
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
