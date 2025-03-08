import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table, Tooltip } from "@radix-ui/themes";
import NextLink from "next/link";
import { RxPerson } from "react-icons/rx";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { assignedToUser: true },
    });

    return (
        <Card>
            <Heading size="4" m="3">
                Latest Issues
            </Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify="between" align="center">
                                    <Flex direction="column" align="start" gap="1">
                                        <Tooltip content={"Go to issue"}>
                                            <NextLink href={`/issues/${issue.id}`}>
                                                {issue.title}
                                            </NextLink>
                                        </Tooltip>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Tooltip
                                            content={
                                                "Assigned to " + issue.assignedToUser.name
                                            }
                                        >
                                            <Avatar
                                                radius="full"
                                                size="2"
                                                src={issue.assignedToUser.image!}
                                                fallback={<RxPerson />}
                                                referrerPolicy="no-referrer"
                                            />
                                        </Tooltip>
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues;
