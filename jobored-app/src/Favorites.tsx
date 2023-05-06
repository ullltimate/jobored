import { Text, Center, Image, Button, Box } from "@mantine/core"
import { NavLink } from "react-router-dom"

function Favorites(){
    return (
        <>
            <Center mt={120}>
                <Box ta={'center'}>
                    <Image width={240} src='../src/assets/favorite-empty.svg' ml={'auto'} mr={'auto'}></Image>
                    <Text m={32} fw={700} ff={'Inter'} fz={24}>Упс, здесь еще ничего нет!</Text>
                    <NavLink to='/'><Button variant="light">Поиск вакансий</Button></NavLink>
                </Box>
            </Center>
        </>
    )
}

export default Favorites