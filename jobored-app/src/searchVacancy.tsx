import { Flex, 
         Card, 
         Group, 
         Button, 
         Select, 
         Box, 
         TextInput, 
         Text, 
         Image, 
         Pagination, 
         Loader, 
         Center, 
         NumberInput } from "@mantine/core"
import CardVacancy from "./cardVacancy"
import { useState, useEffect } from "react";
import { getToken } from "./getToken";

function SearchVacancy(){
    const [vacancies, setVacancies] = useState([]);
    const [activePage, setPage] = useState(1);
    const [categoties, setCategories] = useState([]);
    const [loading, setLoader] = useState(false);
    let date = new Date();
    let todayTimestamp = date.getTime()/1000;
    let [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchVacancies = async (page:number, searchValue?:string) => {
            let accessToken;
            let useTimeToken;
            if(localStorage.getItem('token') === null || Number(localStorage.getItem('ttl')) <= todayTimestamp){
                const tokenObj = await getToken();
                accessToken = tokenObj.access_token;
                useTimeToken = tokenObj.ttl;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('ttl', useTimeToken);
            } else {
                accessToken = localStorage.getItem('token');
            }
            setLoader(true);
            const response = await fetch(
                `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=4&page=${page-1}&keyword=${searchValue}`, {
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
            setLoader(false);
        };
        fetchVacancies(activePage, searchQuery);
    }, [activePage, searchQuery]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            let accessToken;
            let useTimeToken;
            if(localStorage.getItem('token') === null || Number(localStorage.getItem('ttl')) <= todayTimestamp){
                const tokenObj = await getToken();
                accessToken = tokenObj.access_token;
                useTimeToken = tokenObj.ttl;
                localStorage.setItem('token', accessToken);
                localStorage.setItem('ttl', useTimeToken);
            } else {
                accessToken = localStorage.getItem('token');
            }
            const response = await fetch(
                `https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`, {
                    headers: {
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                        'Authorization': `Bearer ${accessToken}`
                    }
                  }
            );
            const data = await response.json();
            console.log(data);
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <>
            <Flex columnGap={28}>
              <Card mah={360}>
                <Group spacing={67} mb={32}>
                  <Text>Фильтры</Text><Button variant="subtle" color="gray" compact>Сбросить все <Image src='../src/assets/close.svg'></Image></Button>
                </Group>
                <Select 
                  data-elem='industry-select'
                  label='Отрасль' 
                  placeholder='Выберете отрасль'
                  data={categoties.map((e:any)=>e.title_rus)}
                  mb={20}
                >
                </Select>
                <NumberInput
                  data-elem='salary-from-input'
                  label='Оклад' 
                  placeholder='От'
                  step={1000}
                  min={0}
                  mb={8}
                >
                </NumberInput>
                <NumberInput
                  data-elem='salary-to-input'
                  placeholder='До'
                  step={1000}
                  min={0}
                  mb={20}
                >
                </NumberInput>
                <Button color='#5E96FC' fullWidth data-elem='search-button'>
                  Применить
                </Button>
              </Card>
              <Box w={600}>
                <TextInput 
                  data-elem='search-input'
                  placeholder='Введите название вакансии'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  display={'block'}
                  icon={<Image width={16} src='../src/assets/search.svg'></Image>}
                  rightSection={<Button color='#5E96FC' compact ml={-40} data-elem='search-button'>Поиск</Button>}
                  mb={16}
                ></TextInput>
                {
                  loading
                  ? <Center h={500}><Loader /></Center>
                  : vacancies.map((e: any) => <CardVacancy profession={e.profession} town={e.town.title} paymentto={e.payment_to} paymentfrom={e.payment_from} currency={e.currency} typeWork={e.type_of_work.title} id={e.id}/>)
                }
                <Pagination value={activePage} onChange={setPage} total={500/4} position="center" />
              </Box>
            </Flex>
        </>
    )
}

export default SearchVacancy