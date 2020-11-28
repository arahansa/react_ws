import {useRef} from "react";


let initWs = false;
export const useWs = (send: string, addr: string) : WebSocket | null => {
    const webSocket = useRef(null);
    console.log("window : "+typeof window );
    if (typeof window !== 'undefined' && !initWs) {
        // @ts-ignore
        webSocket.current = new WebSocket(addr);
        const wws = webSocket.current;
        // @ts-ignore
        wws.onopen = () => {
            if(send!==null && send.length > 1){
                // @ts-ignore
                wws.send(send);
            }
        };
        initWs = true;
    }
    return webSocket.current;
};
