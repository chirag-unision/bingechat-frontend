import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { API_BASE_URL_WS } from '../services/client';
import { ChatProvider, useChat } from '../context/ChatContext';

const VideoChatRoom= () => {

    const username= localStorage.getItem('username');
    const [socketMessages, setSocketMessages] = useState([]);
    const [connectedTo, setConnectedTo] = useState("");
    const [connecting, setConnecting] = useState(false);
    // const [alert, setAlert] = useState(null);
    const [message, setMessage] = useState("");
    const [check, setCheck]= useState(false);
    const connectedRef = useRef();
    const messagesRef = useRef([]);
    // const [messages, setMessages]= useState([]);
    const {channel, connection, updateChannel, updateConnection}= useChat();

    const ws = useRef(null);
    const localVideo= useRef(null);
    const remoteVideo= useRef(null);
    const localStream= useRef(null);
    
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
        startVideo().then(() => {
            start()
        })
      }

    ws.current.onclose = () => {
      ws.current.close();
      console.log('connection closed babe!')
    };
    
    return () => ws.current.close();

    }, [])

    useEffect(() => {
        if(check) {
        let data = socketMessages.pop();
        console.log(data);
        if (data) {
          switch (data.type) {
            case "init":
                setTimeout(() => {
                    setConnection(username);
                }, 200);
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
        }
    }, [socketMessages, check])
    

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

        localStream.current.getTracks().forEach(track => {
            localConnection.addTrack(track, localStream.current);
        });
    
        localConnection.ontrack = (event) => {
            remoteVideo.current.srcObject = event.streams[0];
        };

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
            setCheck(true);
        })();


    }

    const setConnection= (userName) => {
        setConnecting(true);
        setConnectedTo(userName);
        connectedRef.current = userName;
        handleConnection(userName);
        setConnecting(false);

    }

    const handleConnection= (name) => {
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

    const startVideo = async () => {
        try {
            localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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

  return (
    <div>
        <h1>VideoChatSpace</h1>
        <video 
            id="localVideo" 
            style={{width: "300px", height: "200px", border: "1px solid #ddd", margin: "5px", transform: "scaleX(-1)"}} 
            ref={localVideo} 
            autoPlay 
            playsInline
            muted>
        </video>
        <video 
            id="remoteVideo" 
            style={{width: "300px", height: "200px", border: "1px solid #ddd", margin: "5px", transform: "scaleX(-1)"}} 
            ref={remoteVideo} 
            autoPlay 
            playsInline>
        </video>

    </div>
  )
}

function VideoChatSpace() {
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
            <VideoChatRoom />
        </ChatProvider>
    )
}

export default VideoChatSpace