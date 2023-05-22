import { Center, Box, Button, Image, Text } from "@mantine/core";

function EmptyState(){
    return (
        <>
            <Center mt={120}>
                <Box ta={'center'}>
                    <Image width={240} src='../src/assets/favorite-empty.svg' ml={'auto'} mr={'auto'}></Image>
                    <Text m={32} fw={700} ff={'Inter'} fz={24}>Упс, здесь еще ничего нет!</Text>
                    <a href='/'><Button variant="light">Поиск вакансий</Button></a>
                </Box>
            </Center>
        </>
    )
}

export default EmptyState