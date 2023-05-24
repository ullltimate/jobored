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
import { urlAPI } from "../helpers/apiHelpers";
import EmptyState from "./EmptyState";
import { useFetch } from "../helpers/useFetch";

function SearchVacancy(){
    const [activePage, setPage] = useState(1);
    const [categoties, setCategories] = useState([]);
    let [searchQuery, setSearchQuery] = useState('');
    let [textInput, setTextInput] = useState('');
    let [keySelect, setKeySelect] = useState('');
    let [valuePaymentFrom, setValuePaymentFrom] = useState('');
    let [valuePaymentTo, setValuePaymentTo] = useState('');
    let [totalVac, setTotalVac] = useState(500);
    let [valueSelect, setValueSelect] = useState('');
    const {responseObj, loading, error} = useFetch(`${urlAPI}/vacancies/?count=4&page=${activePage-1}&published=1&no_agreement=1${searchQuery}`);
    const {responseObj: objCateg, loading: loadingCateg, error: errorCateg} = useFetch(`${urlAPI}/catalogues/`);
    if(error){
      console.log(error);
    }
    if(errorCateg){
      console.log(errorCateg);
    }
    useEffect(()=>{
      objCateg && setCategories(objCateg);
    })
    useEffect(()=>{
      responseObj && setTotalVac(responseObj.total);
    })

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
              <Card className="filters-block" mah={360} mb={15} radius={12}>
                <Group mb={32}>
                  <Text className="filters-title" mr={67} fw={700} size={20}>Фильтры</Text><Button variant="subtle" color="gray" compact onClick={clearFilter}>Сбросить все <Image src='./close.svg'></Image></Button>
                </Group>
                {
                  loadingCateg
                  ? <Center><Loader /></Center>
                  : <Select 
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
                }
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
                <Button color='#5E96FC' fullWidth data-elem='search-button' radius={8} onClick={() => createSearchParams(keySelect, valuePaymentFrom, valuePaymentTo, textInput)}>
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
                  onKeyDown={(e) => e.code === 'Enter' ? createSearchParams(keySelect, valuePaymentFrom, valuePaymentTo, textInput) : ''}
                  rightSection={<Button color='#5E96FC' compact ml={-40} data-elem='search-button' onClick={() => createSearchParams(keySelect, valuePaymentFrom, valuePaymentTo, textInput)}>Поиск</Button>}
                  mb={16}
                ></TextInput>
                { loading 
                ? <Center h={500}><Loader /></Center>
                : responseObj && responseObj.objects.map((e: any) => <CardVacancy profession={e.profession} town={e.town.title} paymentto={e.payment_to} paymentfrom={e.payment_from} currency={e.currency} typeWork={e.type_of_work.title} id={e.id} key={e.id}/>)
                }
              <Pagination value={activePage} onChange={setPage} total={totalVac>500 ? 500/4 : Math.ceil(totalVac/4)} position="center" />
              </Box>
            </Flex>
        </>
    )
}

export default SearchVacancy