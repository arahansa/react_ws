import Layout from '../components/Layout'
import {useCallback, useEffect, useState} from "react";
import {useWs} from "../utils/customhooks";

/**
 *
 * @constructor
 */
const Ws4Page = () => {
    const [value, setter]= useState(0);
    const [arr, setArr] = useState(new Array<string>());

    const ws = useWs("first send", "wss://echo.websocket.org");
    const callback = useCallback((evt:any)  => {
        console.log("evt :",evt.data)
        const newArr = [evt.data].concat(arr);
        if(newArr.length > 10){
            newArr.pop();
        }
        console.log("set arr !", arr.length);
        setArr(newArr);
        setTimeout(()=>{
            // @ts-ignore
            ws.send(value+"<=value, message : " + new Date());
        }, 1000);
    }, [arr, value]);
    if(ws!==null){
        ws.onmessage = callback;
    }
    useEffect(() => {
        return () => {
            if(ws !== null){
                ws.close();
            }
        }
    }, []);

    const handleClick = useCallback(() =>{
        //
        console.log("핸들 클릭?");
        setter(value+1);

    },[value]);

    return (
        <Layout title="ws4 | Next.js + TypeScript Example">
            <p>ws4 페이지</p>
            <p>value : {value}</p>
            <hr/>
            <div>문제점 :
                <p>1. 근데 이것도 onMessage 가 계속 세팅이긴하다 ㅠ</p>
            </div>
            { arr && arr.map((value, index) => <div key={index}>{value}</div>)}
            <button onClick={handleClick}>버튼?</button>
        </Layout>
    )
}

export default Ws4Page
