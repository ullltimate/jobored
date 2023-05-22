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
import CardVacancy from "./CardVacancy"
import { useState, useEffect } from "react";
import { HEADERS, getToken, url } from "../helpers";
import EmptyState from "./EmptyState";

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
    let [valuePaymentFrom, setValuePaymentFrom] = useState('');
    let [valuePaymentTo, setValuePaymentTo] = useState('');
    let [totalVac, setTotalVac] = useState(500);
    let [valueSelect, setValueSelect] = useState('');

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
                `${url}/vacancies/?count=4&page=${page-1}&published=1&no_agreement=1${searchValue}`, {
                    headers: HEADERS(accessToken)
                  }
            );
            const data = await response.json();
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
                `${url}/catalogues/`, {
                    headers: HEADERS(accessToken)
                  }
            );
            const data = await response.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);
    function createSearchParams(categ: string, payFrom: string, payTo: string, searchValue: string){
      setSearchQuery(`&keyword=${searchValue}&catalogues=${categ}&payment_from=${payFrom}&payment_to=${payTo}`)
    }
    function clearFilter(){
      setTextInput('');
      setValueSelect('');
      setValuePaymentFrom('');
      setValuePaymentTo('');
      setSearchQuery('');
    }
    if(totalVac === 0){
      return (
        <>
          <EmptyState/>
        </>
      )
    }
    return (
        <>
            <Flex columnGap={18} wrap={'wrap'} justify={"center"}>
              <Card mah={360}>
                <Group mb={32}>
                  <Text mr={67} fw={700} size={20}>Фильтры</Text><Button variant="subtle" color="gray" compact onClick={clearFilter}>Сбросить все <Image src='./close.svg'></Image></Button>
                </Group>
                <Select 
                  data-elem='industry-select'
                  label='Отрасль'
                  placeholder='Выберете отрасль'
                  data={categoties.map((e:any) => e.title_trimmed)}
                  mb={20}
                  clearable={true}
                  value={valueSelect}
                  onChange={(elem:any) => {
                    setValueSelect(elem);
                    categoties.map((e:any)=>{
                      if(elem === e.title_trimmed){
                        setKeySelect(e.key)
                      }
                    })}
                  }
                >
                </Select>
                <NumberInput
                  data-elem='salary-from-input'
                  label='Оклад' 
                  placeholder='От'
                  value={Number(valuePaymentFrom) || ''}
                  step={1000}
                  min={0}
                  mb={8}
                  onChange={(e) => setValuePaymentFrom(String(e))}
                >
                </NumberInput>
                <NumberInput
                  data-elem='salary-to-input'
                  placeholder='До'
                  value={Number(valuePaymentTo) || ''}
                  step={1000}
                  min={0}
                  mb={20}
                  onChange={(e) => setValuePaymentTo(String(e))}
                >
                </NumberInput>
                <Button color='#5E96FC' fullWidth data-elem='search-button' onClick={() => createSearchParams(keySelect, valuePaymentFrom, valuePaymentTo, textInput)}>
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
                  icon={<Image width={16} src='./search.svg'></Image>}
                  rightSection={<Button color='#5E96FC' compact ml={-40} data-elem='search-button' onClick={() => createSearchParams(keySelect, valuePaymentFrom, valuePaymentTo, textInput)}>Поиск</Button>}
                  mb={16}
                ></TextInput>
                {
                  loading
                  ? <Center h={500}><Loader /></Center>
                  : vacancies.map((e: any) => <CardVacancy profession={e.profession} town={e.town.title} paymentto={e.payment_to} paymentfrom={e.payment_from} currency={e.currency} typeWork={e.type_of_work.title} id={e.id} key={e.id}/>)
                }
                <Pagination value={activePage} onChange={setPage} total={totalVac>500 ? 500/4 : Math.ceil(totalVac/4)} position="center" />
              </Box>
            </Flex>
        </>
    )
}

export default SearchVacancy