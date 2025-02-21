"use client";
import { Container, Flex, Spinner } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdBugReport } from "react-icons/md";

const Navbar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <nav className="px-5 border-b shadow-sm mb-5 py-4">
            <Container>
                <Flex justify="between">
                    <Flex align="center">
                        <Link href="/">
                            <MdBugReport size="2rem" />
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
                    </Flex>
                    <Flex align="center" gap="2">
                        {session && <span>{session.user?.name}</span>}
                        {status === "authenticated" && (
                            <Link href="/api/auth/signout">Logout</Link>
                        )}
                        {status === "unauthenticated" && (
                            <Link href="/api/auth/signin">Login</Link>
                        )}
                        {status === "loading" && <Spinner />}
                    </Flex>
                </Flex>
            </Container>
        </nav>
    );
};

export default Navbar;
