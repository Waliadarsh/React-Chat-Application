import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import '../App.css'

const Chat = ({ socket, username, room }) => {
    const [currentmessage, setCurrentmessage] = useState("")
    const [messagelist, setMessagelist] = useState([])

    const sendMessage = async () => {
        let messageData;
        if (currentmessage !== "") {
            messageData = {
                room,
                author: username,
                messgae: currentmessage,
                time: new Date(Date.now()).getHours()
                    + " : " + new Date(Date.now()).getMinutes()
            }
        }

        await socket.emit("send_message", messageData);
        setMessagelist((list) => [...list, messageData])
        setCurrentmessage("")
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("received_Data", data)
            setMessagelist((list) => [...list, data])
        })

    }, [socket])

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messagelist.map( messageContent => {

                        return <div className='message'
                            id={username === messageContent.author ? "You" : "other"}  >
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.messgae}</p>
                                </div>
                                <div className='mesage-meta'>
                                    <span id="time">{messageContent.time} </span>
                                    <span id="author">{username === messageContent.author ? "you" : messageContent.author}</span>
                                </div>
                            </div>
                        </div>;
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentmessage}
                    placeholder='type here...'
                    onChange={e => setCurrentmessage(e.target.value)}
                    onKeyPress = { e=> {
                        e.key === "Enter" && sendMessage() ;
                    } }
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
