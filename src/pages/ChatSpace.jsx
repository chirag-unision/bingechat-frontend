import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { API_BASE_URL_WS } from '../services/client';
import { ChatProvider, useChat } from '../context/ChatContext';
import Chat from './chat';

const ChatRoom= () => {
    const username= localStorage.getItem('username');
    const [socketMessages, setSocketMessages] = useState([]);
    const [connectedTo, setConnectedTo] = useState("");
    const [connecting, setConnecting] = useState(false);
    // const [alert, setAlert] = useState(null);
    const [message, setMessage] = useState("");
    const connectedRef = useRef();
    const messagesRef = useRef([]);
    // const [messages, setMessages]= useState([]);
    const {channel, connection, updateChannel, updateConnection}= useChat();

    const ws = useRef(null);
    
    const configuration = {
        iceServers: [{ url: "stun:stun.1.google.com:19302" }]
    };

    useEffect(() => {
      ws.current= new WebSocket(API_BASE_URL_WS+"/chat?token="+localStorage.getItem('accessToken'));
      ws.current.onmessage = message => {
        const data= JSON.parse(message.data)
        setSocketMessages(prev => [...prev, data])
      }

      ws.current.onopen = () => {
        start();
      }

    ws.current.onclose = () => {
      ws.current.close();
      console.log('connection closed babe!')
    };
    
    return () => ws.current.close();

    }, [])

    useEffect(() => {
        let data = socketMessages.pop();
        console.log(data);
        if (data) {
          switch (data.type) {
            case "init":
                setConnection(username);
              break;
            case "offer":
              onReceivingOffer(data);
              break;
            case "answer":
              onReceivingAnswer(data);
              break;
            case "candidate":
              onCandidate(data);
              break;
            default:
              break;
          }
        }
    }, [socketMessages])

    // useEffect(() => {
    //   console.log(messages);
    // }, [messages])
    

    const send = data => {
        ws.current.send(JSON.stringify(data));
    };

    const onReceivingOffer= ({ offer, name }) => {
        setConnectedTo(name);
        connectedRef.current = name;
        connection.current.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => connection.current.createAnswer())
        .then(answer => connection.current.setLocalDescription(answer))
        .then(() =>
            send({ identifier: 'exchange', data: { type: "answer", answer: connection.current.localDescription, name: username }})
        )
        .catch(e => {
            console.log({ e });
        });
    };

    const onReceivingAnswer = ({ answer, name }) => {
        connection.current.setRemoteDescription(new RTCSessionDescription(answer));
        setConnectedTo(name);
        connectedRef.current = name;
    };
    
    const onCandidate = ({ candidate }) => {
        connection.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const start= () => {
        let localConnection = new RTCPeerConnection(configuration);
        localConnection.onicecandidate = ({candidate}) => {
            let connectedTo = connectedRef.current;
            if (candidate && !!connectedTo) {
              send({
                identifier: "exchange",
                data: {
                    name: connectedTo,
                    type: "candidate",
                    candidate
                }
              });
            }
        }

        localConnection.ondatachannel= (event) => {
            let newChannel= event.channel;
            newChannel.onopen= () => {
                console.log('Data Channel is open now.')
            }
            newChannel.onmessage = handleDCMR;
            updateChannel(newChannel);
        }

        localConnection.oniceconnectionstatechange = () => {
          const state = localConnection.iceConnectionState;
          console.log(`ICE Connection State: ${state}`);
  
          if (state === 'disconnected' || state === 'failed' || state === 'closed') {
              window.location.reload();
          }
        };

        (() => {
            updateConnection(localConnection);
            console.log(connection.current);
        })();


    }

    const sendMsg = (text) => {
        // const time = new Date().toLocaleTimeString();
        // let text = { name, message, time };
        // let messages = messagesRef.current;
        // let connectedTo = connectedRef.current;
        // let userMessages = messages[connectedTo];
        // if (messages[connectedTo]) {
        //   userMessages = [...userMessages, text];
        //   let newMessages = Object.assign({}, messages, {
        //     [connectedTo]: userMessages
        //   });
        //   messagesRef.current = newMessages;
        //   setMessages(newMessages);
        // } else {
        //   userMessages = Object.assign({}, messages, { [connectedTo]: [text] });
        //   messagesRef.current = userMessages;
        //   setMessages(userMessages);
        // }
        updateMessages(text);
        channel.current.send(JSON.stringify(text));
        // setMessage("");
    };

    const handleDCMR= ({data}) => {
        const message = JSON.parse(data);
        console.log(message);
        updateMessages(message);
        // const { name: user } = message;
        // let messages = messagesRef.current;
        // let userMessages = messages[user];
        // if (userMessages) {
        //   userMessages = [...userMessages, message];
        //   let newMessages = Object.assign({}, messages, { [user]: userMessages });
        //   messagesRef.current = newMessages;
        //   setMessages(newMessages);
        // } else {
        //   let newMessages = Object.assign({}, messages, { [user]: [message] });
        //   messagesRef.current = newMessages;
        //   setMessages(newMessages);
        // }
    }

    const setConnection= (userName) => {
        setConnecting(true);
        setConnectedTo(userName);
        connectedRef.current = userName;
        handleConnection(userName);
        setConnecting(false);

    }

    const handleConnection= (name) => {
        let dataChannel = connection.current.createDataChannel("messenger");
        dataChannel.onmessage = handleDCMR;
        updateChannel(dataChannel);
        connection.current
        .createOffer()
        .then(offer => connection.current.setLocalDescription(offer))
        .then(() =>
          send({ identifier: 'exchange', data: { type: "offer", offer: connection.current.localDescription, name }})
        )
        .catch(e =>
            console.log(e)
        );
    }

    const updateMessages = (data) => {
      // setMessages([...messages, data]);
      messagesRef.current= [...messagesRef.current, data];
      setMessage(data);
    }

    const handleCheck= () => {
        sendMsg();
    }

  return (
    <div>
        <h1>ChatRoom</h1>
        {/* <button onClick={handleCheck}>heyyy</button> */}
        <Chat sendMsg={sendMsg} updateMessages={updateMessages} messages={messagesRef.current} username={username} connectedTo={connectedRef.current} />
    </div>
  )
}

function ChatSpace() {
    const user = localStorage.getItem("accessToken");
    if (!user) {
        window.location.href = "/login";
    }

    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
              window.location.reload();
          }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);
    
    return (
        <ChatProvider>
            <ChatRoom />
        </ChatProvider>
    )
}

export default ChatSpace