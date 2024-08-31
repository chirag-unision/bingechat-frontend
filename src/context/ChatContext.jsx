import React, { createContext, useState, useEffect, useRef } from 'react'

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    // const [connection, setConnection]= useState(null);
    // const [channel, setChannel]= useState(null);

    const connection = useRef(null);
    const channel = useRef(null);

    const updateConnection = item => {
        // setConnection(item)
        connection.current= item;
        // console.log(connection)
        
    };
    const updateChannel = item => {
        // setChannel(item);
        channel.current= item;
        // console.log(channel)
    };

    // useEffect(() => {
    //     console.log(connection)
    // }, [connection])
    

  return (
    <ChatContext.Provider value={{ updateChannel, updateConnection, channel, connection }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
    const context = React.useContext(ChatContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default ChatContext