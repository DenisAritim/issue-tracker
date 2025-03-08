import { prisma } from "@/lib/prisma";
import { Issue, Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { RxArrowDown, RxArrowUp } from "react-icons/rx";
import { IssueStatusBadge, Link } from "../components";
import Pagination from "../components/Pagination";
import IssueToolbar from "./IssueToolbar";
import { Metadata } from "next";

interface Props {
    searchParams: Promise<{
        status: Status;
        orderBy: keyof Issue;
        orderDirection: "asc" | "desc";
        page: string;
    }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const { status, orderBy, orderDirection, page } = await searchParams;

    const columns: { label: string; value: keyof Issue; className?: string }[] = [
        {
            label: "Issue",
            value: "title",
        },
        {
            label: "Status",
            value: "status",
            className: "hidden md:table-cell",
        },
        {
            label: "Created",
            value: "createdAt",
            className: "hidden md:table-cell",
        },
        {
            label: "Assigned to",
            value: "assignedToUserId",
            className: "hidden md:table-cell",
        },
    ];

    const validStatus = Object.values(Status);
    const validStatusQuery = validStatus.includes(status) ? status : undefined;
    const where = { status: validStatusQuery };

    const validOrder = columns.map((column) => column.value);
    const validOrderQuery = validOrder.includes(orderBy) ? orderBy : undefined;

    const pageSize = 10;
    const issueCount = await prisma.issue.count({ where });
    const totalPages = Math.ceil(issueCount / pageSize);
    const parsedPage = parseInt(page);
    const validPage =
        isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, totalPages);

    const issues = await prisma.issue.findMany({
        where,
        orderBy: validOrderQuery ? { [orderBy]: orderDirection } : { createdAt: "desc" },
        include: { assignedToUser: true },
        skip: (validPage - 1) * pageSize,
        take: pageSize,
    });

    const buildQuery = (orderBy: string, orderDirection: "asc" | "desc") => {
        const query = new URLSearchParams();
        if (validStatusQuery) query.append("status", validStatusQuery);
        query.append("orderBy", orderBy);
        query.append("orderDirection", orderDirection);
        if (page) query.append("page", page);
        return query.toString();
    };

    return (
        <Flex direction="column" gap="3">
            <IssueToolbar />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell
                                key={column.value}
                                className={column.className + " items-center"}
                            >
                                <NextLink
                                    href={`/issues?${buildQuery(
                                        column.value,
                                        orderDirection === "asc" ? "desc" : "asc"
                                    )}`}
                                >
                                    {column.label}
                                </NextLink>
                                {column.value === orderBy && orderDirection === "asc" && (
                                    <RxArrowUp className="inline" />
                                )}
                                {column.value === orderBy &&
                                    orderDirection === "desc" && (
                                        <RxArrowDown className="inline" />
                                    )}
                                {!orderBy && column.value === "createdAt" && (
                                    <RxArrowDown className="inline" />
                                )}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.RowHeaderCell>
                                <Link href={"./issues/" + issue.id}>{issue.title}</Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.RowHeaderCell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.assignedToUser
                                    ? issue.assignedToUser.name
                                    : "Unassigned"}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Flex justify="center">
                <Pagination
                    pageSize={pageSize}
                    itemCount={issueCount}
                    currentPage={validPage}
                />
            </Flex>
        </Flex>
    );
};

export default IssuesPage;
export const metadata: Metadata = {
    title: "Issue Tracker - Issue List",
    description: "View all project issues",
};
