import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
    params: Promise<{ id: string }>;
}

const DetailPage = async ({ params }: Props) => {
    let isLoading = true;
    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) notFound();

    isLoading = false;
    return (
        <Skeleton loading={isLoading}>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card mt="4" className="prose">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </Skeleton>
    );
};

export default DetailPage;
