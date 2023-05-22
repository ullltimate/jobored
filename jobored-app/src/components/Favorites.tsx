import { Center, Loader } from "@mantine/core"
import { useState, useEffect } from "react";
import { getToken } from "../getToken";
import CardVacancy from "./cardVacancy";
import EmptyState from "./EmptyState";

function Favorites(){

    let url:string = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?ids[]=';
    let params:string = '';
    let arrayIdLS = localStorage.getItem('arrayId');
    const [loading, setLoader] = useState(false);

    if (arrayIdLS !== null){
        let arrayId = JSON.parse(arrayIdLS);
        if(arrayId.length !== 0){
            params = arrayId.join('&ids[]=')
        }
    }
    url = url.concat(params);

    let date = new Date();
    let todayTimestamp = date.getTime()/1000;

    const [favoritesVacancies, setFavorites] = useState([]);
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
                url, {
                    headers: {
                        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
                        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                        'Authorization': `Bearer ${accessToken}`
                    }
                  }
            );
            const data = await response.json();
            setFavorites(data.objects);
            setLoader(false);
        };
        fetchVacancy();
    }, []);

    if (arrayIdLS !== null){
        let arrayId = JSON.parse(arrayIdLS);
        if(arrayId.length !== 0){
            return (
                <>
                    {
                    loading
                    ? <Center h={500}><Loader /></Center>
                    : favoritesVacancies.map((e:any) => <CardVacancy profession={e.profession} town={e.town.title} paymentto={e.payment_to} paymentfrom={e.payment_from} currency={e.currency} typeWork={e.type_of_work.title} id={e.id} key={e.id}/>)
                    }
                </>
            )
        }
    }

    return (
        <>  
            <EmptyState />
        </>
    )
}

export default Favorites