import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Loader, Center } from "@mantine/core";
import CardVacancy from "./CardVacancy";
import { urlAPI } from '../helpers/apiHelpers';
import { useFetch } from "../helpers/useFetch";

function Vacancy(){
    const params = useParams();

    const [vacancy, setVacancy] = useState('');
    const [profession, setProfession] = useState('');
    const [paymentto, setPaymentTo] = useState('');
    const [paymentfrom, setPaymentFrom] = useState('');
    const [currency, setCurrency] = useState('');
    const [town, setTown] = useState('');
    const [typeWork, setTypeWork] = useState('');
    const {responseObj, loading, error} = useFetch(`${urlAPI}/vacancies/${params.id}/`);
    if(error){
        console.log(error);
    }
    useEffect(() => {
        responseObj && setVacancy(responseObj.vacancyRichText);
        responseObj && setProfession(responseObj.profession);
        responseObj && setPaymentTo(responseObj.payment_to);
        responseObj && setPaymentFrom(responseObj.payment_from);
        responseObj && setCurrency(responseObj.currency);
        responseObj && setTown(responseObj.town.title);
        responseObj && setTypeWork(responseObj.type_of_work.title);
    })

    return (
        <>  
            {
              loading
              ? <Center h={500}><Loader /></Center>
              : <><CardVacancy profession={profession} paymentto={paymentto} paymentfrom={paymentfrom} currency={currency} town={town} typeWork={typeWork} id={Number(params.id)}/>
                <Card maw={773} mr={'auto'} ml={'auto'} radius={12}>
                    <div dangerouslySetInnerHTML={{ __html: vacancy }} />
                </Card>
                </>
            }

        </>
    )
}

export default Vacancy