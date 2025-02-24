"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
    RxChevronLeft,
    RxChevronRight,
    RxDoubleArrowLeft,
    RxDoubleArrowRight,
} from "react-icons/rx";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    return (
        <Flex align="center" gap="2">
            <Button size="1" variant="soft" disabled={currentPage === 1 && true}>
                <RxDoubleArrowLeft />
            </Button>
            <Button size="1" variant="soft" disabled={currentPage === 1 && true}>
                <RxChevronLeft />
            </Button>
            <Text>
                Page {currentPage} of {pageCount}
            </Text>
            <Button size="1" variant="soft" disabled={currentPage === pageCount && true}>
                <RxChevronRight />
            </Button>
            <Button size="1" variant="soft" disabled={currentPage === pageCount && true}>
                <RxDoubleArrowRight />
            </Button>
        </Flex>
    );
};

export default Pagination;
