import { prisma } from "@/lib/prisma";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
    params: Promise<{ id: string }>;
}

const DetailPage = async ({ params }: Props) => {
    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    );
};

export default DetailPage;
