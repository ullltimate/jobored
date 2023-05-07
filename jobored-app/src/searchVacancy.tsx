import { Flex, Card, Group, Button, Select, Box, TextInput, Text, Image } from "@mantine/core"
import CardVacancy from "./cardVacancy"
import { useState, useEffect } from "react";

function SearchVacancy(){
    const [vacancies, setVacancies] = useState([]);

    async function getToken() {
        try {
            const response = await fetch(
              `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0`, {
                headers: {
                    'x-secret-key': 'GEU4nvd3rej*jeh.eqp'
                }
              }
            );
            const result = await response.json();
            return result;
          } catch (e) {
            console.log(e);
          }
    }

    useEffect(() => {
        const fetchVacancies = async () => {
            const tokenObj = await getToken();
            const accessToken = tokenObj.access_token;
            const response = await fetch(
                `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=4&page=1`, {
                    headers: {
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                        'Authorization': `Bearer ${accessToken}`
                    }
                  }
            );
            const data = await response.json();
            console.log(data.objects);
            setVacancies(data.objects);
         };
         fetchVacancies();
     }, []);

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
                {vacancies.map((e: any) => <CardVacancy profession={e.profession} town={e.town.title} paymentto={e.payment_to} paymentfrom={e.payment_from} currency={e.currency} typeWork={e.type_of_work.title}/>)}
              </Box>
            </Flex>
        </>
    )
}

export default SearchVacancy