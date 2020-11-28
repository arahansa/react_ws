import Layout from '../components/Layout'
import {useCallback, useEffect, useState} from "react";

/**
 *
 * @constructor
 */
const Ws3Page = () => {
    const [value, setter]= useState(0);
    const [arr, setArr] = useState(new Array<string>());

    useEffect(() => {
        const websocket = new WebSocket("wss://echo.websocket.org");
        websocket.onopen = () => {
            // websocket.send("send message with value" + value);
        };
        websocket.onmessage = function(evt) {
            console.log("evt :",evt.data)
            const newArr = [evt.data].concat(arr);
            if(newArr.length > 10){
                newArr.pop();
            }
            setArr(newArr);
        };
        const intervalId = setInterval(() => {
            websocket.send(value+"<=value, message : " + new Date());
        }, 1000);
        websocket.onclose = () =>{
            console.log("웹소켓이 닫히네? :", websocket);
        }
        return () => {
            websocket.close();
            clearInterval(intervalId);
        }
    }, [value, arr]);

    const handleClick = useCallback(() =>{
        //
        console.log("핸들 클릭?");
        setter(value+1);
    },[value]);

    return (
        <Layout title="ws1 | Next.js + TypeScript Example">
            <p>ws3 페이지</p>
            <p>value : {value}</p>
            <hr/>
            <div>문제점 :
                <p>1. 매번 웹소켓을 이렇게 닫고 다시 열어야해..?</p>
            </div>
            { arr && arr.map((value, index) => <div key={index}>{value}</div>)}
            <button onClick={handleClick}>버튼?</button>
            <img src="https://user-images.githubusercontent.com/6437210/100474895-11f8c880-3125-11eb-9f28-f98fabac0856.png" />
        </Layout>
    )
}

export default Ws3Page
