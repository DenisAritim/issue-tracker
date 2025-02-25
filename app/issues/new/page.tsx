import { Metadata } from "next";
import IssueFormWrapper from "../_components/IssueFormWrapper";

const NewIssuePage = () => {
    return <IssueFormWrapper />;
};

export default NewIssuePage;
export const metadata: Metadata = {
    title: "Issue Tracker - New Issue",
    description: "Create a new issue in the tracker and assign relevant details.",
};
