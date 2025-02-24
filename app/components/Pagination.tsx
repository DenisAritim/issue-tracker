"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push("?" + params);
    };

    return (
        <Flex align="center" gap="2">
            <Button
                size="1"
                variant="soft"
                disabled={currentPage === 1 && true}
                onClick={() => changePage(1)}
            >
                <RxDoubleArrowLeft />
            </Button>
            <Button
                size="1"
                variant="soft"
                disabled={currentPage === 1 && true}
                onClick={() => changePage(currentPage - 1)}
            >
                <RxChevronLeft />
            </Button>
            <Text>
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                size="1"
                variant="soft"
                disabled={currentPage === pageCount && true}
                onClick={() => changePage(currentPage + 1)}
            >
                <RxChevronRight />
            </Button>
            <Button
                size="1"
                variant="soft"
                disabled={currentPage === pageCount && true}
                onClick={() => changePage(pageCount)}
            >
                <RxDoubleArrowRight />
            </Button>
        </Flex>
    );
};

export default Pagination;
