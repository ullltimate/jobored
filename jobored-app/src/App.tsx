import { Header, 
          Container, 
          Group, 
          Image, 
          AppShell, 
          Flex,
        } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';
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
          <Container id='content'>
            <Outlet />
            
          </Container>
        }
    </AppShell>
    </>
  )
}

export default App
