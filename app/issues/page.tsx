import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../components";
import IssueToolbar from "./IssueToolbar";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { RxArrowDown, RxArrowUp } from "react-icons/rx";

interface Props {
    searchParams: Promise<{
        status: Status;
        orderBy: keyof Issue;
        orderDirection: "asc" | "desc";
    }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const status = (await searchParams).status;
    const orderBy = (await searchParams).orderBy;
    const orderDirection = (await searchParams).orderDirection;

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

    const validOrder = columns.map((column) => column.value);
    const validOrderQuery = validOrder.includes(orderBy) ? orderBy : undefined;

    const issues = await prisma.issue.findMany({
        where: { status: validStatusQuery },
        orderBy: validOrderQuery ? { [orderBy]: orderDirection } : undefined,
        include: { assignedToUser: true },
    });

    const buildQuery = (orderBy: string, orderDirection: "asc" | "desc") => {
        const query = new URLSearchParams();
        if (validStatusQuery) query.append("status", validStatusQuery);
        query.append("orderBy", orderBy);
        query.append("orderDirection", orderDirection);
        return query.toString();
    };

    return (
        <div>
            <IssueToolbar />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell
                                key={column.value}
                                className={column.className}
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
        </div>
    );
};

export default IssuesPage;
