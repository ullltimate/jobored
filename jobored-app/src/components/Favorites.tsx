import { Center, Loader, Pagination } from "@mantine/core"
import { useState, useEffect } from "react";
import { urlAPI } from "../helpers/apiHelpers";
import CardVacancy from "./CardVacancy";
import EmptyState from "./EmptyState";
import { useFetch } from "../helpers/useFetch";

function Favorites(){

    const [activePage, setPage] = useState(1);
    let [totalVac, setTotalVac] = useState(500);
    let urlIds:string = `${urlAPI}/vacancies/?ids[]=`;
    let params:string = '';
    let arrayIdLS = localStorage.getItem('arrayId');
    const [favoritesVacancies, setFavorites] = useState([]);

    if (arrayIdLS !== null){
        let arrayId = JSON.parse(arrayIdLS);
        if(arrayId.length !== 0){
            params = arrayId.join('&ids[]=')
        }
    }
    urlIds = urlIds.concat(params);

    const {responseObj, loading, error} = useFetch(`${urlIds}&count=4&page=${activePage-1}`);
    if(error){
        console.log(error);
    }

    useEffect(()=>{
        responseObj && setFavorites(responseObj.objects);
        responseObj && setTotalVac(responseObj.total);
    })

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
                    <Pagination value={activePage} onChange={setPage} total={totalVac>500 ? 500/4 : Math.ceil(totalVac/4)} position="center" />
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