import { Box, Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton mb="2rem" height="30px" />
            <Skeleton height="20rem" />
        </Box>
    );
};

export default IssueFormSkeleton;
