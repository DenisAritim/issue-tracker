import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
    params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Flex direction="column" align="stretch" gap="4">
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            )}
        </Grid>
    );
};

export async function generateMetadata({ params }: Props) {
    const idString = (await params).id;
    const id = parseInt(idString);
    const issue = await prisma.issue.findUnique({ where: { id } });

    console.log(issue?.title);

    return {
        title: "Issue Tracker - " + issue!.title,
        description: "Details of issue " + issue!.id,
    };
}

export default IssueDetailPage;
