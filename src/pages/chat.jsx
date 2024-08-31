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
        <div className="border p-3 bg-white rounded-lg m-4 md:m-auto md:w-1/3">
            <h1 className="text-2xl font-bold text-center border-b ">{connectedTo}'s Chat</h1>
            <div className="flex flex-row gap-2 ">
                <div className="w-full">
                    <div className="overflow-auto scroll-smooth" id="chatbox" style={{
                        height: "calc(100vh - 11rem)"
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
                        <input name="message" type="text" className="p-2 border w-full rounded-md" placeholder="Send Something..." />
                        <button type="submit" >
                            <PrimaryButton className=" p-2  text-white ">Send</PrimaryButton>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;