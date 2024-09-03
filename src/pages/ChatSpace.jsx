import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { API_BASE_URL_WS } from '../services/client';
import { ChatProvider, useChat } from '../context/ChatContext';
import Chat from './chat';
import { GreenButton, RedButton } from '../components/Button';
import { checkUserVerificationStatus } from '../services/Auth';
import { useCookies } from 'react-cookie';
import { useAuth } from '../context/AuthContext';
import ReportModal from '../components/ReportModal'

const ChatRoom= () => {
    const username= localStorage.getItem('username');
    const curremail= localStorage.getItem('email');
    const [socketMessages, setSocketMessages] = useState([]);
    const [connectedTo, setConnectedTo] = useState("No one");
    const [userEmail, setUserEmail] = useState("");
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
        iceServers: [
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' },
          { urls: 'stun:stun.infra.net:3478' },
          { urls: 'stun:numb.viagenie.ca:3478' },
          { urls: 'stun:s1.taraba.net:3478' },
          { urls: 'stun:s2.taraba.net:3478' },
          { urls: 'stun:stun.12connect.com:3478' },
          { urls: 'stun:stun.12voip.com:3478' },
          { urls: 'stun:stun.1und1.de:3478' },
          { urls: 'stun:stun.3cx.com:3478' },
          { urls: 'stun:stun.acrobits.cz:3478' },
          { urls: 'stun:stun.actionvoip.com:3478' },
          { urls: 'stun:stun.advfn.com:3478' },
          { urls: 'stun:stun.aeta-audio.com:3478' },
          { urls: 'stun:stun.aeta.com:3478' },
          { urls: 'stun:stun.altar.com.pl:3478' },
          { urls: 'stun:stun.annatel.net:3478' },
          { urls: 'stun:stun.antisip.com:3478' },
          { urls: 'stun:stun.avigora.com:3478' },
          { urls: 'stun:stun.avigora.fr:3478' },
          { urls: 'stun:stun.awa-shima.com:3478' },
          { urls: 'stun:stun.awt.be:3478' },
          { urls: 'stun:stun.b2b2c.ca:3478' },
          { urls: 'stun:stun.bahnhof.net:3478' },
          { urls: 'stun:stun.barracuda.com:3478' },
          { urls: 'stun:stun.bluesip.net:3478' },
          { urls: 'stun:stun.bmwgs.cz:3478' },
          { urls: 'stun:stun.botonakis.com:3478' },
          { urls: 'stun:stun.budgetphone.nl:3478' },
          { urls: 'stun:stun.budgetsip.com:3478' },
          { urls: 'stun:stun.cablenet-as.net:3478' },
          { urls: 'stun:stun.callromania.ro:3478' },
          { urls: 'stun:stun.callwithus.com:3478' },
          { urls: 'stun:stun.cbsys.net:3478' },
          { urls: 'stun:stun.chathelp.ru:3478' },
          { urls: 'stun:stun.cheapvoip.com:3478' },
          { urls: 'stun:stun.ciktel.com:3478' },
          { urls: 'stun:stun.cloopen.com:3478' },
          { urls: 'stun:stun.comfi.com:3478' },
          { urls: 'stun:stun.commpeak.com:3478' },
          { urls: 'stun:stun.comtube.com:3478' },
          { urls: 'stun:stun.comtube.ru:3478' },
          { urls: 'stun:stun.cope.es:3478' },
          { urls: 'stun:stun.counterpath.com:3478' },
          { urls: 'stun:stun.counterpath.net:3478' },
          { urls: 'stun:stun.cryptonit.net:3478' },
          { urls: 'stun:stun.darioflaccovio.it:3478' },
          { urls: 'stun:stun.datamanagement.it:3478' },
          { urls: 'stun:stun.dcalling.de:3478' },
          { urls: 'stun:stun.decanet.fr:3478' },
          { urls: 'stun:stun.demos.ru:3478' },
          { urls: 'stun:stun.develz.org:3478' },
          { urls: 'stun:stun.dingaling.ca:3478' },
          { urls: 'stun:stun.doublerobotics.com:3478' },
          { urls: 'stun:stun.drogon.net:3478' },
          { urls: 'stun:stun.duocom.es:3478' },
          { urls: 'stun:stun.dus.net:3478' },
          { urls: 'stun:stun.e-fon.ch:3478' },
          { urls: 'stun:stun.easybell.de:3478' },
          { urls: 'stun:stun.easycall.pl:3478' },
          { urls: 'stun:stun.easyvoip.com:3478' },
          { urls: 'stun:stun.einsundeins.com:3478' },
          { urls: 'stun:stun.einsundeins.de:3478' },
          { urls: 'stun:stun.ekiga.net:3478' },
          { urls: 'stun:stun.epygi.com:3478' },
          { urls: 'stun:stun.etoilediese.fr:3478' },
          { urls: 'stun:stun.eyeball.com:3478' },
          { urls: 'stun:stun.freecall.com:3478' },
          { urls: 'stun:stun.freeswitch.org:3478' },
          { urls: 'stun:stun.freevoipdeal.com:3478' },
          { urls: 'stun:stun.fuzemeeting.com:3478' },
          { urls: 'stun:stun.gmx.de:3478' },
          { urls: 'stun:stun.gmx.net:3478' },
          { urls: 'stun:stun.gradwell.com:3478' },
          { urls: 'stun:stun.halonet.pl:3478' },
          { urls: 'stun:stun.hellonanu.com:3478' },
          { urls: 'stun:stun.hoiio.com:3478' },
          { urls: 'stun:stun.hosteurope.de:3478' },
          { urls: 'stun:stun.ideasip.com:3478' },
          { urls: 'stun:stun.imesh.com:3478' },
          { urls: 'stun:stun.infra.net:3478' },
          { urls: 'stun:stun.internetcalls.com:3478' },
          { urls: 'stun:stun.intervoip.com:3478' },
          { urls: 'stun:stun.ipcomms.net:3478' },
          { urls: 'stun:stun.ipfire.org:3478' },
          { urls: 'stun:stun.ippi.fr:3478' },
          { urls: 'stun:stun.ipshka.com:3478' },
          { urls: 'stun:stun.iptel.org:3478' },
          { urls: 'stun:stun.irian.at:3478' },
          { urls: 'stun:stun.it1.hr:3478' },
          { urls: 'stun:stun.ivao.aero:3478' },
          { urls: 'stun:stun.jappix.com:3478' },
          { urls: 'stun:stun.jumblo.com:3478' },
          { urls: 'stun:stun.justvoip.com:3478' },
          { urls: 'stun:stun.kanet.ru:3478' },
          { urls: 'stun:stun.kiwilink.co.nz:3478' },
        ]
    };

    const {setloader}= useAuth();

    useEffect(() => {
        setloader(false)
        
        return () => {
            setloader(true)
        }
    }, [])

    const handleEscape = () => {
        try {
          channel.current.send(JSON.stringify({type: 'decline'}))
        } catch {}
        window.location.reload()
    }

    const handleReport = () => {
        document.getElementById("accountdialog").showModal();
    }

    useEffect(() => {
      startVideo().then(() => {
        createWebSocket();
      });
    
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
    

    async function createWebSocket() {
      const userVerificationStatus= localStorage.getItem('userVerificationStatus');
      if (userVerificationStatus === null) {
        const res = await checkUserVerificationStatus();

        if(!res) {
          console.log('User is not verified');
          window.location.href = "/verifyUser";
        }else{
          localStorage.setItem('userVerificationStatus', res);
        }
      }else if(userVerificationStatus === 'false'){
        console.log('User is not verified');
        window.location.href = "/verifyUser";
      }
      

      if(localStorage.getItem('accessToken') === null) {
        window.location.href = "/login";
      }

      ws.current = new WebSocket(API_BASE_URL_WS + "/chat?token=" + localStorage.getItem('accessToken'));
    
      ws.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        setSocketMessages((prev) => [...prev, data]);
      };
    
      ws.current.onopen = () => {
          // start();
      };
    
      ws.current.onclose = () => {
        console.log('Connection closed babe!');
        setTimeout(() => {
          if (!isRTCConnected.current) {
            createWebSocket(); 
            console.log('reconnecting')
            setLoading(true);
          }
        }, 3000); 
      };
    
      ws.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
        ws.current.close(); 
      };
    }

    const send = data => {
        ws.current.send(JSON.stringify(data));
    };

    const onConnDecline= () => {
      console.log('decline triggered')
      window.location.reload();
    }

    const onReceivingOffer= ({ offer, name, email }) => {
        start();
        setConnectedTo(name);
        setUserEmail(email);
        connectedRef.current = name;
        connection.current.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => connection.current.createAnswer())
        .then(answer => connection.current.setLocalDescription(answer))
        .then(() =>
            send({ identifier: 'exchange', data: { type: "answer", answer: connection.current.localDescription, name: username, email: curremail }})
        )
        .catch(e => {
            console.log({ e });
        });
    };

    const onReceivingAnswer = ({ answer, name, email }) => {
        connection.current.setRemoteDescription(new RTCSessionDescription(answer));
        setConnectedTo(name);
        setUserEmail(email);
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
        updateMessages(text);
        channel.current.send(JSON.stringify(text));
    };

    const handleDCMR= ({data}) => {
        const message = JSON.parse(data);
        console.log(message);

        if(message.type=='msg')
        updateMessages(message);

        if(message.type=='decline')
        onConnDecline();
    }

    const setConnection= (userName) => {
        setConnectedTo(userName);
        connectedRef.current = userName;
        handleConnection(userName);
    }

    const handleConnection= (name) => {
        start();
        let dataChannel = connection.current.createDataChannel("messenger");
        dataChannel.onmessage = handleDCMR;
        updateChannel(dataChannel);
        connection.current
        .createOffer()
        .then(offer => connection.current.setLocalDescription(offer))
        .then(() =>
          send({ identifier: 'exchange', data: { type: "offer", offer: connection.current.localDescription, name, email: curremail }})
        )
        .catch(e =>
            console.log(e)
        );
    }

    const constraints = {
      video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30, max: 60 }
      },
      audio: true
    };

    const startVideo = async () => {
      try {
          localStream.current = await navigator.mediaDevices.getUserMedia(constraints);
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
        {/* <h1 className='text-center w-full bg-extras rounded-lg mb-3 p-2 font-serif text-secondary'>Welcome to the ChatRoom</h1> */}
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
            <div className='flex w-full flex-col md:flex-row justify-end '>
              {userEmail && <span className='text-white font-medium text-md p-2 mx-auto '>Email: {userEmail}</span>}
              <div className={"flex flex-row"}>
              <RedButton disabled={loading} onClick={handleReport} className={"w-full md:w-40 mx-2 text-white"}>{'REPORT'}</RedButton>
              <GreenButton onClick={handleEscape} className={"w-full md:w-40 mx-2 text-white"}>{'ESCAPE'}</GreenButton>
              </div>
          </div>
          <div className='flex md:hidden w-full'>
          <Chat handleEscape={handleEscape} sendMsg={sendMsg} updateMessages={updateMessages} messages={messagesRef.current} username={username} connectedTo={connectedRef.current} />
          </div>
          <ReportModal userEmail={userEmail} />
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

    const [cookies,setCookies] = useCookies(["instructionPass"]);
    
    
    useEffect(()=>{
      console.log(cookies.instructionPass)
      if(! cookies?.instructionPass) {
        window.location.href = "/start";
      }
    },[cookies])
    
    return (
        <ChatProvider>
            <ChatRoom />
        </ChatProvider>
    )
}

export default ChatSpace