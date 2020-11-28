import Layout from '../components/Layout'
import {useCallback, useEffect, useState} from "react";

/**
 *
 * @constructor
 */
const Ws2Page = () => {
    const [value, setter]= useState(0);

    useEffect(() => {
        const websocket = new WebSocket("wss://echo.websocket.org");
        websocket.onopen = () => {
            websocket.send("send message with value" + value);
        }
        websocket.onmessage = function(evt) { console.log("evt :",evt.data) };
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
    }, [value]);

    const handleClick = useCallback(() =>{
        //
        console.log("핸들 클릭?");
        setter(value+1);
    },[value]);

    return (
        <Layout title="ws1 | Next.js + TypeScript Example">
            <p>ws2 페이지</p>
            <p>value : {value}</p>
            <hr/>
            <div>문제점 :
                <p>1. 매번 웹소켓을 이렇게 닫고 다시 열어야해..?</p>
            </div>
            <button onClick={handleClick}>버튼?</button>
        </Layout>
    )
}

export default Ws2Page
