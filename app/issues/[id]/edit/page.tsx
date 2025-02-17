import { prisma } from "@/lib/prisma";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
    const { id: idString } = await params;
    const id = parseInt(idString);

    if (isNaN(id)) notFound();

    const issue = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issue) notFound();

    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
