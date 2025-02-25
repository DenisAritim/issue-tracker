import { prisma } from "@/lib/prisma";
import IssueChart from "./IssueChart";

const page = async () => {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

    return <IssueChart open={open} inProgress={inProgress} closed={closed} />;
};

export default page;
