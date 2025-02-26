import { Suspense } from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const StatusFilterWrap = () => {
    return (
        <Suspense>
            <IssueStatusFilter />
        </Suspense>
    );
};

export default StatusFilterWrap;
