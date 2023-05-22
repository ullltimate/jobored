import { Card, Group, Image, Text } from "@mantine/core"
import { NavLink } from "react-router-dom"
import '../App.css'

let arrayId: number[] = [];

function CardVacancy(props:any){

    function changeColor(e:any){
        const elem = e.currentTarget;
        if (!elem.classList.contains('activeFav')){
            elem.classList.add('activeFav');
            arrayId.push(props.id);
            localStorage.setItem('arrayId', JSON.stringify(arrayId));
        } else {
            elem.classList.remove('activeFav');
            let myIndex = arrayId.indexOf(props.id);
            if (myIndex !== -1) {
                arrayId.splice(myIndex, 1);
            }
            localStorage.setItem('arrayId', JSON.stringify(arrayId));
        }   
    }

    let arrayIdLS = localStorage.getItem('arrayId');

    if (arrayIdLS !== null){
        arrayId = JSON.parse(arrayIdLS);
        if (arrayId.length !== 0){
            for(let i=0; i<arrayId.length; i++){
                if(arrayId[i] === props.id){
                    return (
                        <>
                            <Card mb={16} data-elem={`vacancy-${props.id}`}>
                                <Group position='apart' mb={12}>
                                    <NavLink to={`/vacancy/${props.id}`} style={{maxWidth: 500}}>{props.profession}</NavLink>
                                    <svg data-elem={`vacancy-${props.id}-shortlist-button`} className="activeFav" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={changeColor}>
                                        <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" strokeWidth="1.5"/>
                                    </svg>
                                </Group>
                                <Group mb={12}>
                                    <Text fw={700}>
                                        {salary(props.paymentfrom, props.paymentto)}
                                        {props.currency}
                                    </Text>
                                    <Text>•</Text>
                                    <Text>{props.typeWork}</Text>
                                </Group>
                                <Group>
                                    <Image width={20} src='../src/assets/location.svg'></Image>
                                    <Text>{props.town}</Text>
                                </Group>
                            </Card>
                        </>
                    )
                }
            }
        }
    }
    
    function salary(peyFrom: number, peyTo: number){
        let salary:string;
        let strFrom: string = ' ';
        let strTo: string = ' ';
        if (peyFrom !== 0){
           strFrom = ` от ${peyFrom} `;
        }
        if (peyTo !== 0){
            strTo = ` до ${peyTo} `;
        }
        if (peyFrom === peyTo){
            salary = `з/п ${peyFrom} `
        } else {
            salary = `з/п ${strFrom} ${strTo}`
        }
        return salary;
    }

    return (
        <>
            <Card mb={16} data-elem={`vacancy-${props.id}`}>
                <Group position='apart' mb={12}>
                    <NavLink to={`/vacancy/${props.id}`} style={{maxWidth: 500, fontSize: 20}}>{props.profession}</NavLink>
                    <svg data-elem={`vacancy-${props.id}-shortlist-button`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={changeColor}>
                        <path d="M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z" stroke="#ACADB9" strokeWidth="1.5"/>
                    </svg>
                </Group>
                <Group mb={12}>
                    <Text fw={700}>
                        {salary(props.paymentfrom, props.paymentto)}
                        {props.currency}
                    </Text>
                    <Text>•</Text>
                    <Text>{props.typeWork}</Text>
                </Group>
                <Group>
                    <Image width={20} src='../src/assets/location.svg'></Image>
                    <Text>{props.town}</Text>
                </Group>
            </Card>
        </>
    )
}
export default CardVacancy