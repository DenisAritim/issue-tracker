import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import NextLink from "next/link";
import { RxCircleBackslash, RxPerson } from "react-icons/rx";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { assignedToUser: true },
    });

    return (
        <Card className="w-1/2">
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
                                        <NextLink href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </NextLink>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUser ? (
                                        <Avatar
                                            radius="full"
                                            size="2"
                                            src={issue.assignedToUser.image!}
                                            fallback={<RxPerson />}
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <Avatar
                                            radius="full"
                                            size="2"
                                            src=""
                                            className="flex items-center justify-center"
                                            fallback={
                                                <RxCircleBackslash
                                                    color="red"
                                                    size="100%"
                                                />
                                            }
                                        />
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
