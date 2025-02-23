import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../components";
import IssueToolbar from "./IssueToolbar";
import { Status } from "@prisma/client";

interface Props {
    searchParams: Promise<{ status: Status }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
    const validStatus = Object.values(Status);

    const statusQuery = (await searchParams).status;

    const status = validStatus.includes(statusQuery) ? statusQuery : undefined;

    const issues = await prisma.issue.findMany({
        where: { status },
        include: { assignedToUser: true },
    });

    return (
        <div>
            <IssueToolbar />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Assigned to
                        </Table.ColumnHeaderCell>
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
