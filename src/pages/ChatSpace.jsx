import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { API_BASE_URL_WS } from '../services/client';
import { ChatProvider, useChat } from '../context/ChatContext';
import Chat from './chat';
import { GreenButton } from '../components/Button';

const ChatRoom= () => {
    const username= localStorage.getItem('username');
    const [socketMessages, setSocketMessages] = useState([]);
    const [connectedTo, setConnectedTo] = useState("No one");
    const [connecting, setConnecting] = useState(false);
    const [loading, setLoading] = useState(true);
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

    const handleEscape = () => {
        try {
          channel.current.send(JSON.stringify({type: 'decline'}))
        } catch {}
        window.location.reload()
    }

    useEffect(() => {
      createWebSocket();
    
    return () => ws.current.close();

    }, [])

    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') handleEscape();
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
            setLoading(true);
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
            setLoading(false);

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
    <div className='md:w-[80%] w-full p-3 md:p-0 m-auto'>
        <h1 className='text-center w-full bg-extras rounded-lg mb-3 p-2 font-serif text-secondary'>Welcome to the VideoRoom</h1>
        <div className='flex gap-4 flex-col md:flex-row '>
          <div className='hidden md:w-1/3 md:flex gap-4 flex-col'>
            <video 
                id="localVideo" 
                className='rounded-md bg-extras h-[21vh] '
                ref={localVideo} 
                autoPlay 
                playsInline
                muted>
            </video>
            <Chat handleEscape={handleEscape} sendMsg={sendMsg} updateMessages={updateMessages} messages={messagesRef.current} username={username} connectedTo={connectedRef.current} />
          </div>
          <div
            className={'w-full flex flex-col   bg-extras rounded-md p-4 overflow-clip '}
          >
                <div className={' text-secondary mx-auto  font-mono '+ (!loading ? '': 'hidden')}>
                  Connected to <span
                      className={'bg-base rounded-md font-extralight py-1 px-2 text-secondary animate-pulse ' }
                    >
                      {connectedTo}
                    </span>
                </div>
                <div className={'w-full m-auto rounded-lg overflow-clip '+(!loading ? '': 'hidden')}>
                    <video 
                        className={'w-full bg-base max-h-[20vh] md:max-h-[60vh] '}
                        ref={remoteVideo} 
                        autoPlay 
                        playsInline
                    >
                    </video>
                </div>  
            <div className={"animate-pulse duration-100 rounded-lg w-full md:h-[70%] m-auto bg-base flex "+ (!loading ? 'hidden': '')}>
              <svg aria-hidden="true" className="inline w-[50%] h-[50%] m-auto text-extras animate-spin dark:text-base fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
            <div className='flex w-full justify-end'>
            <GreenButton onClick={handleEscape} className="hidden md:block font-mono font-bold p-2 text-secondary">{'ESCAPE'}</GreenButton>
            </div>
          </div>
          <div className='flex md:hidden w-full'>
          <Chat handleEscape={handleEscape} sendMsg={sendMsg} updateMessages={updateMessages} messages={messagesRef.current} username={username} connectedTo={connectedRef.current} />
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