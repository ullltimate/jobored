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
                    <Image width={24} src='../src/assets/save.svg'></Image>
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