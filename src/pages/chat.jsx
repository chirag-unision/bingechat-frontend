import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/Button";
import LeftMsg from "../components/leftMsg";
import RightMsg from "../components/rightMsg";

const Chat = ({sendMsg, updateMessages, messages, username, connectedTo}) => {

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

    useEffect(() => {
        document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
    }, [])

    return (
        <div className="p-3 bg-[#2b2b2b] rounded-lg m-4 md:m-4">
            <h1 className="text-2xl font-bold text-center border-b text-white">{connectedTo}'s Chat</h1>
            <div className="flex flex-row gap-2">
                <div className="w-full">
                    <div className="overflow-auto scroll-smooth" id="chatbox" style={{
                        height: "calc(420px - 4rem)"
                    }}>
                        <div className="flex flex-col gap-2 p-2 w-full">
                            {messages && messages.map((msg, index) => {
                                if (msg.name === username) {
                                    return <RightMsg key={index} message={msg.message} time={msg.time} />
                                } else {
                                    return <LeftMsg key={index} message={msg.message} time={msg.time} />
                                }
                            })}
                        </div>
                    </div>
                    <form className="flex flex-row w-full overflow-auto" onSubmit={handleSend}
                    >
                        <div className="relative w-full">
                        <input name="message" type="text" className="p-3 border w-full rounded-3xl" placeholder="Send Something..." />
                        <button type="submit" >
                            <PrimaryButton className="p-3 text-white absolute top-0 right-0 rounded-r-3xl">{'Send >'}</PrimaryButton>
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;