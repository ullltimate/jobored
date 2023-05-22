import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Loader, Center } from "@mantine/core";
import CardVacancy from "./CardVacancy";
import { getToken } from '../getToken';

function Vacancy(){
    const params = useParams();

    const [vacancy, setVacancy] = useState('');
    const [profession, setProfession] = useState('');
    const [paymentto, setPaymentTo] = useState('');
    const [paymentfrom, setPaymentFrom] = useState('');
    const [currency, setCurrency] = useState('');
    const [town, setTown] = useState('');
    const [typeWork, setTypeWork] = useState('');
    const [loading, setLoader] = useState(false);

    let date = new Date();
    let todayTimestamp = date.getTime()/1000;

    useEffect(() => {
        const fetchVacancy = async () => {
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
                `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${params.id}/`, {
                    headers: {
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                        'Authorization': `Bearer ${accessToken}`
                    }
                  }
            );
            const data = await response.json();
            setVacancy(data.vacancyRichText);
            setProfession(data.profession);
            setPaymentTo(data.payment_to);
            setPaymentFrom(data.payment_from);
            setCurrency(data.currency);
            setTown(data.town.title);
            setTypeWork(data.type_of_work.title);
            setLoader(false);
        };
        fetchVacancy();
    }, []);

    return (
        <>  
            {
              loading
              ? <Center h={500}><Loader /></Center>
              : <><CardVacancy profession={profession} paymentto={paymentto} paymentfrom={paymentfrom} currency={currency} town={town} typeWork={typeWork} id={Number(params.id)}/>
                <Card>
                    <div dangerouslySetInnerHTML={{ __html: vacancy }} />
                </Card>
                </>
            }

        </>
    )
}

export default Vacancy