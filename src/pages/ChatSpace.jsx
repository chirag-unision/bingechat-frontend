import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { API_BASE_URL_WS } from '../services/client';
import { ChatProvider, useChat } from '../context/ChatContext';
import Chat from './chat';

const ChatRoom= () => {
    const username= localStorage.getItem('username');
    const [socketMessages, setSocketMessages] = useState([]);
    const [connectedTo, setConnectedTo] = useState("No one");
    const [connecting, setConnecting] = useState(false);
    // const [alert, setAlert] = useState(null);
    const [message, setMessage] = useState("");
    const connectedRef = useRef();
    const messagesRef = useRef([]);
    const isRTCConnected= useRef(false);
    // const [messages, setMessages]= useState([]);
    const {channel, connection, updateChannel, updateConnection}= useChat();

    const ws = useRef(null);
    const localVideo= useRef(null);
    const remoteVideo= useRef(null);
    const localStream= useRef(null);
    
    const configuration = {
        iceServers: [{ url: "stun:stun4.1.google.com:19302" }]
    };

    useEffect(() => {
      createWebSocket();
    
    return () => ws.current.close();

    }, [])

    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            try {
              channel.current.send(JSON.stringify({type: 'decline'}))
            } catch {}
            window.location.reload()
          }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    useEffect(() => {
        let data = socketMessages.shift();
        console.log(data);
        if (data) {
          switch (data.type) {
            case "init":
              setTimeout(() => {
                setConnection(username);
              }, 2000);
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
    

    function createWebSocket() {
      ws.current = new WebSocket(API_BASE_URL_WS + "/chat?token=" + localStorage.getItem('accessToken'));
    
      ws.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        setSocketMessages((prev) => [...prev, data]);
      };
    
      ws.current.onopen = () => {
        startVideo().then(() => {
          start();
        });
      };
    
      ws.current.onclose = () => {
        console.log('Connection closed. Attempting to reconnect...');
        setTimeout(() => {
          if (!isRTCConnected.current) {
            createWebSocket();  // Attempt to reconnect
            console.log('reconnecting')
          }
        }, 3000);  // Reconnect after 3 seconds
      };
    
      ws.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
        ws.current.close();  // Ensure the connection is closed
      };
    }


    const send = data => {
        ws.current.send(JSON.stringify(data));
    };

    const onConnDecline= () => {
      console.log('decline triggered')
      window.location.reload();
    }

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

        // connection.current.onicecandidate = ({candidate}) => {
        //   let connectedTo = connectedRef.current;
        //   if (candidate && !!connectedTo) {
        //     send({
        //       identifier: "exchange",
        //       data: {
        //           name: connectedTo,
        //           type: "candidate",
        //           candidate
        //       }
        //     });
        //   }
        // }

        // connection.current.oniceconnectionstatechange = () => {
        //   const state = connection.current.iceConnectionState;
        //   console.log(`ICE Connection State: ${state}`);
  
        //   if (state === 'disconnected' || state === 'failed' || state === 'closed') {
        //       window.location.reload();
        //   }
        //   if (state === 'connected') {
        //     ws.current.close();
        //   }
        // };
    };

    const onReceivingAnswer = ({ answer, name }) => {
        connection.current.setRemoteDescription(new RTCSessionDescription(answer));
        setConnectedTo(name);
        connectedRef.current = name;

        // connection.current.onicecandidate = ({candidate}) => {
        //   let connectedTo = connectedRef.current;
        //   if (candidate && !!connectedTo) {
        //     send({
        //       identifier: "exchange",
        //       data: {
        //           name: connectedTo,
        //           type: "candidate",
        //           candidate
        //       }
        //     });
        //   }
        // }

        // connection.current.oniceconnectionstatechange = () => {
        //   const state = connection.current.iceConnectionState;
        //   console.log(`ICE Connection State: ${state}`);
  
        //   if (state === 'disconnected' || state === 'failed' || state === 'closed') {
        //       window.location.reload();
        //   }
        //   if (state === 'connected') {
        //     ws.current.close();
        //   }
        // };
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

        localStream.current.getTracks().forEach(track => {
          localConnection.addTrack(track, localStream.current);
        });
  
        localConnection.ontrack = (event) => {
          remoteVideo.current.srcObject = event.streams[0];
        };

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
          if (state === 'connected') {
            isRTCConnected.current= true;
            ws.current.close();

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

        if(message.type=='msg')
        updateMessages(message);

        if(message.type=='decline')
        onConnDecline();
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

    const constraints = {
      video: {
          width: { ideal: 1080 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, max: 60 }
      }
    };

    const startVideo = async () => {
      try {
          localStream.current = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: true
          });
          if (localVideo.current) {
              localVideo.current.srcObject = localStream.current;
              // localStream.current.getTracks().forEach(track => {
              //     connection.current.addTrack(track, localStream.current);
              // });
          }
      } catch (error) {
          console.error('Error accessing media devices.', error);
      }
    };

    const updateMessages = (data) => {
      // setMessages([...messages, data]);
      messagesRef.current= [...messagesRef.current, data];
      setMessage(data);
    }

  return (
    <div className='w-[80%] m-auto'>
        <h1 className='text-center w-full bg-extras rounded-lg mb-3 p-2 font-serif text-secondary'>Welcome to the VideoRoom</h1>
        <div className='flex gap-4 '>
        <div className='md:w-1/3 flex gap-4 flex-col'>
          <video 
              id="localVideo" 
              className='rounded-md bg-extras'
              ref={localVideo} 
              autoPlay 
              playsInline
              muted>
          </video>
          <Chat sendMsg={sendMsg} updateMessages={updateMessages} messages={messagesRef.current} username={username} connectedTo={connectedRef.current} />
        </div>
        <div
          className='w-full flex flex-col   bg-extras rounded-md p-4 overflow-clip'
        >
          {isRTCConnected.current &&
            <div className=' text-secondary mx-auto  font-mono '>
                Connected to <span
                  className='bg-base rounded-md font-extralight py-1 px-2'
                >
                  {connectedTo}
                </span>
            </div>
          }
          <div className='w-full m-auto rounded-lg overflow-clip'>
              <video 
                  className='w-full bg-base'
                  ref={remoteVideo} 
                  autoPlay 
                  playsInline
              >
              </video>
            </div>
        </div>
        </div>
    </div>
  )
}

function ChatSpace() {
    const user = localStorage.getItem("accessToken");
    if (!user) {
        window.location.href = "/login";
    }
    
    return (
        <ChatProvider>
            <ChatRoom />
        </ChatProvider>
    )
}

export default ChatSpace