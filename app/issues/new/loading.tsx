import { Box, Skeleton } from "@radix-ui/themes";
import React from "react";

const LoadingNewIssuePage = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton mb="2rem" height="30px" />
            <Skeleton height="20rem" />
        </Box>
    );
};

export default LoadingNewIssuePage;
