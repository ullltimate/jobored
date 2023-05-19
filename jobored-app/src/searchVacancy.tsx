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
    let [textInput, setTextInput] = useState('');
    let [keySelect, setKeySelect] = useState('');
    let [valuePeymentFrom, setValuePeymentFrom] = useState('');
    let [valuePeymentTo, setValuePeymentTo] = useState('');
    let [totalVac, setTotalVac] = useState(500);

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
                `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=4&page=${page-1}&published=1&no_agreement=1${searchValue}`, {
                    headers: {
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                        'Authorization': `Bearer ${accessToken}`
                    }
                  }
            );
            const data = await response.json();
            console.log(data.total);
            setVacancies(data.objects);
            setLoader(false);
            setTotalVac(data.total);
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
    function createSearchParams(categ: string, peyFrom: string, peyTo: string, searchValue: string){
      setSearchQuery(`&keyword=${searchValue}&catalogues=${categ}&payment_from=${peyFrom}&payment_to=${peyTo}`)
    }
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
                  data={categoties.map((e:any) => e.title_trimmed)}
                  mb={20}
                  onChange={(elem:any) => {categoties.map((e:any)=>{
                    if(elem === e.title_trimmed){
                      setKeySelect(e.key)
                    }
                  })}}
                >
                </Select>
                <NumberInput
                  data-elem='salary-from-input'
                  label='Оклад' 
                  placeholder='От'
                  step={1000}
                  min={0}
                  mb={8}
                  onChange={(e) => setValuePeymentFrom(String(e))}
                >
                </NumberInput>
                <NumberInput
                  data-elem='salary-to-input'
                  placeholder='До'
                  step={1000}
                  min={0}
                  mb={20}
                  onChange={(e) => setValuePeymentTo(String(e))}
                >
                </NumberInput>
                <Button color='#5E96FC' fullWidth data-elem='search-button' onClick={() => createSearchParams(keySelect, valuePeymentFrom, valuePeymentTo, textInput)}>
                  Применить
                </Button>
              </Card>
              <Box w={600}>
                <TextInput 
                  data-elem='search-input'
                  placeholder='Введите название вакансии'
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  display={'block'}
                  icon={<Image width={16} src='../src/assets/search.svg'></Image>}
                  rightSection={<Button color='#5E96FC' compact ml={-40} data-elem='search-button' onClick={() => createSearchParams(keySelect, valuePeymentFrom, valuePeymentTo, textInput)}>Поиск</Button>}
                  mb={16}
                ></TextInput>
                {
                  loading
                  ? <Center h={500}><Loader /></Center>
                  : vacancies.map((e: any) => <CardVacancy profession={e.profession} town={e.town.title} paymentto={e.payment_to} paymentfrom={e.payment_from} currency={e.currency} typeWork={e.type_of_work.title} id={e.id}/>)
                }
                <Pagination value={activePage} onChange={setPage} total={totalVac>500 ? 500/4 : Math.ceil(totalVac/4)} position="center" />
              </Box>
            </Flex>
        </>
    )
}

export default SearchVacancy