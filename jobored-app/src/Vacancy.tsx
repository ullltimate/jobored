import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@mantine/core";
import CardVacancy from "./cardVacancy";
import { getToken } from "./getToken";

function Vacancy(){
    const params = useParams();
    console.log(params.id);

    const [vacancy, setVacancy] = useState('');
    const [profession, setProfession] = useState('');
    const [paymentto, setPaymentTo] = useState('');
    const [paymentfrom, setPaymentFrom] = useState('');
    const [currency, setCurrency] = useState('');
    const [town, setTown] = useState('');
    const [typeWork, setTypeWork] = useState('');

    useEffect(() => {
        const fetchVacancy = async () => {
            let accessToken;
            if(localStorage.getItem('token') === null){
                const tokenObj = await getToken();
                accessToken = tokenObj.access_token;
                localStorage.setItem('token', accessToken);
            } else {
                accessToken = localStorage.getItem('token');
            }
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
            console.log(data);
            setVacancy(data.vacancyRichText);
            setProfession(data.profession);
            setPaymentTo(data.payment_to);
            setPaymentFrom(data.payment_from);
            setCurrency(data.currency);
            setTown(data.town.title);
            setTypeWork(data.type_of_work.title);
        };
        fetchVacancy();
    }, []);

    return (
        <>
            <CardVacancy profession={profession} paymentto={paymentto} paymentfrom={paymentfrom} currency={currency} town={town} typeWork={typeWork} />
            <Card>
                <div dangerouslySetInnerHTML={{ __html: vacancy }} />
            </Card>
        </>
    )
}

export default Vacancy