import Layout from '../components/Layout'
import {useCallback, useEffect, useState} from "react";

/**
 *
 * @constructor
 */
const Ws1Page = () => {
    const [value, setter]= useState(0);

    useEffect(() => {
        const websocket = new WebSocket("wss://echo.websocket.org");
        websocket.onopen = () => {
            websocket.send("send message with value" + value);
        }
        websocket.onmessage = function(evt) { console.log("evt :",evt.data) };
        setInterval(() => {
            websocket.send(value+"<=value, message : " + new Date());
        }, 1000);
    }, []);

    const handleClick = useCallback(() =>{
        //
        console.log("핸들 클릭?");
        setter(value+1);
    },[value]);

    return (
        <Layout title="ws1 | Next.js + TypeScript Example">
            <p>ws1</p>
            <p>value : {value}</p>
            <hr/>
            <div>문제점 :
                <p>1. handleClick 에서 웹소켓을 접속할 수 있을까?</p>
                <p>2. state는 변하는데 websocket 에서 읽지를 못하네?</p>
                <p>3. 웹소켓 닫기가 없어요</p>
                <p>4. 계속 생기는 인스턴스?</p>
            </div>
            <button onClick={handleClick}>버튼?</button>
        </Layout>
    )
}

export default Ws1Page
