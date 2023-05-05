import { Header, 
          Container, 
          Group, 
          Image, 
          AppShell, 
          Flex, 
          Card,
          Text, 
          Select,
          Button,
          TextInput,
          Box,
          rem,
        } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import './App.css'

function App() {
  const setActive = ({ isActive } : any) =>(isActive ? " active" : " noActive");
  return (
    <>
      <AppShell
        padding="md"
        header={<Header height={84} p={24} mb={40}>{     
          <Container>
            <Flex justify={"flex-start"} columnGap={280} align={'center'}>
              <Image height={36} width={141} fit='contain'  src='../src/assets/logot.svg'></Image>
              <Group>
                  <NavLink to='/' className={setActive} style={{marginRight: 60}}>Поиск вакансий</NavLink>
                  <NavLink to='/favorites' className={setActive}>Избранное</NavLink>
              </Group>
            </Flex>
          </Container>
        }</Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        {
          <Container>
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
          </Container>
        }
    </AppShell>
    </>
  )
}

export default App
