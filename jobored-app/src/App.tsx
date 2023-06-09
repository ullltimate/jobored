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
        header={<Header className='header' height={84} p={24} mb={40}>{     
          <Container>
            <Flex justify={"space-between"} align={'center'}>
              <NavLink to='/'><Image className='header-logo' height={36} width={141} fit='contain'  src='./logot.svg'></Image></NavLink>
              <Group className='links-list' pr={300}>
                  <NavLink to='/' className={setActive}>Поиск вакансий</NavLink>
                  <NavLink to='/favorites' style={{marginLeft: 60}} className={setActive}>Избранное</NavLink>
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
