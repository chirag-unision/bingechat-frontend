import { useEffect, useState } from "react";
import { GreenButton, PrimaryButton } from "../components/Button";
import LeftMsg from "../components/leftMsg";
import RightMsg from "../components/rightMsg";

const Chat = ({sendMsg, updateMessages, messages, username, connectedTo, handleEscape=()=>{}}) => {

    // const username = user.replace(/\s/g, '');
    // const [messages, setMessages] = useState([]);
    

    // const messages = JSON.parse(localStorage.getItem("messages")) || {user1: [], user3: []}; ;


    const handleSend = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        console.log(jsonData);
        if (jsonData.message === "") {
            return;
        }
        let payload = {
            type: 'msg',
            name: username,
            message: jsonData.message,
            time: new Date().toLocaleTimeString()
        }

        sendMsg(payload);
        // updateMessages(payload);
        e.target.reset();
    }

     // get window size
     const width = window.innerWidth;
     let isMobile = false;
     if (width < 768) {
         isMobile = true;
     }

     useEffect(() => {
        document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight

     }, [messages])
     

    return (
        <div className="p-3 bg-extras w-full  rounded-lg">
            <h1 className="text-xl font-medium text-center border-b pb-2 text-white">Messages</h1>
            <div className="flex flex-row gap-2">
                <div className="w-full">
                    <div id="chatbox" className="overflow-auto scroll-smooth" style={{
                        height:(isMobile? "calc(50vh - 6rem)" : "calc(50vh - 4rem)")
                    }}>
                        <div className="flex flex-col gap-2 p-2 text-secondary text- w-full">
                            {messages && messages.map((msg, index) => {
                                if (msg.name === username) {
                                    return <RightMsg  key={index} message={msg.message} time={msg.time} />
                                } else {
                                    return <LeftMsg key={index} message={msg.message} time={msg.time} />
                                }
                            })}
                        </div>
                    </div>
                    <form className="flex flex-row w-full overflow-auto" onSubmit={handleSend}
                    >
                        <div className="relative w-full flex flex-row mx-auto gap-2 ">
                            <div className="flex flex-row w-full ">
                                <input name="message" type="text" className="p-2 px-3 w-full outline-none rounded-l-lg" placeholder="Send Something..." />
                                <button type="submit" >
                                    <PrimaryButton className="p-2 rounded-l-none rounded-r-lg border-primary text-nowrap text-secondary">{'Send >'}</PrimaryButton>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;