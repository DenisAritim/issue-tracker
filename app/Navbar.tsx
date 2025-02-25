"use client";
import { Avatar, Box, Container, DropdownMenu, Flex, Spinner } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdBugReport } from "react-icons/md";
import classnames from "classnames";
import { RxPerson } from "react-icons/rx";

const Navbar = () => {
    return (
        <nav className="px-5 border-b shadow-sm mb-2 lg:mb-5 py-4">
            <Container>
                <Flex justify="between">
                    <Flex align="center">
                        <Link href="/">
                            <MdBugReport size="2rem" />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <Flex align="center">
                        <AuthStatus />
                    </Flex>
                </Flex>
            </Container>
        </nav>
    );
};

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];
    return (
        <ul className="flex gap-5 px-5">
            {links.map((l) => (
                <li key={l.href}>
                    <Link
                        className={classnames({
                            "nav-link": true,
                            "!text-zinc-900": l.href === currentPath,
                        })}
                        href={l.href}
                    >
                        {l.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Spinner />;

    if (status === "unauthenticated")
        return (
            <Link className="nav-link" href="/api/auth/signin">
                Login
            </Link>
        );

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <div className="flex items-center justify-center">
                        <Avatar
                            src={session!.user!.image!}
                            fallback={<RxPerson />}
                            size="2"
                            radius="full"
                            className="cursor-pointer"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};

export default Navbar;
