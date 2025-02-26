import { Metadata } from "next";
import IssueFormWrapper from "../_components/IssueFormWrapper";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Text } from "@radix-ui/themes";

const NewIssuePage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return <Text>You must be logged to perform this action</Text>;

    return <IssueFormWrapper />;
};

export default NewIssuePage;
export const metadata: Metadata = {
    title: "Issue Tracker - New Issue",
    description: "Create a new issue in the tracker and assign relevant details.",
};
