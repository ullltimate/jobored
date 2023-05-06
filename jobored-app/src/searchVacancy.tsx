import { Flex, Card, Group, Button, Select, Box, TextInput, Text, Image } from "@mantine/core"
import { NavLink } from "react-router-dom"

function SearchVacancy(){
    return (
        <>
            <Flex columnGap={28}>
              <Card>
                <Group spacing={67} mb={32}>
                  <Text>Фильтры</Text><Button variant="subtle" color="gray" compact>Сбросить все <Image src='../src/assets/close.svg'></Image></Button>
                </Group>
                <Select 
                  label='Отрасль' 
                  placeholder='Выберете отрасль'
                  data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                  ]}
                  mb={20}
                >
                </Select>
                <Select 
                  label='Оклад' 
                  placeholder='От'
                  data={[
                    { value: '0', label: '0' },
                  ]}
                  mb={8}
                >
                </Select>
                <Select 
                  placeholder='До'
                  data={[
                    { value: '10', label: '100' },
                  ]}
                  mb={20}
                >
                </Select>
                <Button color='#5E96FC' fullWidth>
                  Применить
                </Button>
              </Card>
              <Box w={600}>
                <TextInput 
                  placeholder='Введите название вакансии'
                  display={'block'}
                  icon={<Image width={16} src='../src/assets/search.svg'></Image>}
                  rightSection={<Button color='#5E96FC' compact ml={-40}>Поиск</Button>}
                  mb={16}
                ></TextInput>
                <Card>
                  <Group position='apart' mb={12}>
                    <NavLink to='/'>Менеджер-дизайнер</NavLink>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" stroke-width="1.5"/>
                    </svg>
                  </Group>
                  <Group mb={12}>
                    <Text fw={700}>з/п от 70000 rub</Text>
                    <Text>•</Text>
                    <Text>Полный рабочий день</Text>
                  </Group>
                  <Group>
                    <Image width={20} src='../src/assets/location.svg'></Image>
                    <Text>Новый Уренгой</Text>
                  </Group>
                </Card>
              </Box>
            </Flex>
        </>
    )
}

export default SearchVacancy