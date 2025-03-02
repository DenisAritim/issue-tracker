import { prisma } from "@/lib/prisma";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export const revalidate = 60;

const getStatus = unstable_cache(
    async () => {
        const open = await prisma.issue.count({ where: { status: "OPEN" } });
        const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
        const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
        return { open, inProgress, closed };
    },
    ["statuses"],
    { revalidate: 60, tags: ["statuses"] }
);

const page = async () => {
    const { open, inProgress, closed } = await getStatus();
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary open={open} inProgress={inProgress} closed={closed} />
                <IssueChart open={open} inProgress={inProgress} closed={closed} />
            </Flex>
            <LatestIssues />
        </Grid>
    );
};

export default page;
export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "Overview of open, in-progress, and closed issues in the system.",
};
