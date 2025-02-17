import { Badge, Box, Card, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
    return (
        <Box width="50vw">
            <Heading size="1">
                <Skeleton width="30vw" height="30px" />
            </Heading>
            <Flex gap="3" my="2">
                <Skeleton width="30px" height="24px">
                    <Badge />
                </Skeleton>
                <Skeleton>
                    <Text>Sat Feb 15 2025</Text>
                </Skeleton>
            </Flex>
            <Card mt="4" className="prose">
                <Skeleton>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Repellendus maxime ducimus delectus harum perspiciatis
                    exercitationem hic a magni impedit voluptate dolores autem veniam,
                    quia inventore sed tempora? Modi, odit ut. Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Dolore pariatur aspernatur et
                    tempora temporibus ullam odio fuga distinctio in. Deleniti id nemo
                    error odio reiciendis similique aperiam odit debitis. Corporis.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ut
                    porro quasi exercitationem consequuntur minima maxime ipsum magnam
                    error, expedita repellendus magni incidunt asperiores unde deserunt
                    voluptas possimus placeat minus.
                </Skeleton>
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;
