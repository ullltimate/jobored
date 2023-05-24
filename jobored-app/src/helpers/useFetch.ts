import { useEffect, useState } from "react";
import { getHeaders, getToken } from "../helpers/apiHelpers";

export function useFetch(url: string){

    const [obj, setObj] = useState<any | null>(null);
    const [loading, setLoader] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try{
                let date = new Date();
                let todayTimestamp = date.getTime()/1000;
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
                    `${url}`, {
                        headers: getHeaders(accessToken)
                      }
                );
                const data = await response.json();
                setObj(data);
            } catch(err: any){
                setError(err);
            } finally{
                setLoader(false);
            }
        };
        fetchVacancies();
    }, [url]);

    return {obj, loading, error}
}