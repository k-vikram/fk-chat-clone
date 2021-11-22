import React, { useEffect, useState } from 'react';
import { IMessage, IWindowProps } from "../utils/viewModels";
import styles from "./chatExchangeWindow.module.css";
import { gethhmmFormat } from "../utils/helpers";
import { PaperAirplaneIcon } from '@heroicons/react/solid';



const ChatWindow = ({
    selectedChat
}: IWindowProps): JSX.Element => {

    const [typedText, setTypedText] = useState<string>("");
    const [messageStack, setMessageStack] = useState<IMessage[]>(() => selectedChat?.messageList?.sort((a, b) => a.timestamp - b.timestamp) || []);

    useEffect(() => {
        setMessageStack(selectedChat?.messageList?.sort((a, b) => a.timestamp - b.timestamp));
        setTypedText("");
    }, [selectedChat]);

    const handleChatOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        e.preventDefault();
        setTypedText(e.target?.value);
    }

    const addToChatScreen = () => {
        setMessageStack(prev => [...prev, {
            message: typedText,
            messageId: Math.ceil(Math.random() * 10000).toString(),
            timestamp: new Date().getTime(),
            sender: "USER",
            messageType: "text"
        }]);
        setTypedText("");
    }

    const addIWantACallback = () => setMessageStack(prev => [...prev, {
        message: "I want a callback",
        messageId: Math.ceil(Math.random() * 10000).toString(),
        timestamp: new Date().getTime(),
        sender: "USER",
        messageType: "text"
    }])


    return <section id="chat_messages_section" className={styles.chatContainer + " " + styles.spanHalf}>
        <header className={styles.chatHeader}>
            <div className={styles.chatThumbnailHolder}>
                <img className={styles.chatThumbnail} src={selectedChat.imageURL} alt="item_image" width="25" height="25" loading="lazy" />
            </div>
            <div className={styles.chatHeaderTitle}>
                <div>{selectedChat.title}</div>
            </div>
        </header>
        <section id="chat-exchange-section" className={styles.chatExchangeContainer}>
            {messageStack.map((msg, mIndex) => {
                return <div key={msg.messageId + mIndex} className={msg.sender === "BOT" ? styles.chatMessageBoxBot : styles.chatMessageBoxUser}>
                    <div>
                        <div>
                            {msg.message}
                        </div>
                        <div>
                            {msg.timestamp && gethhmmFormat(msg.timestamp)}
                        </div>
                        {msg.messageType === 'optionedMessage' && msg.options?.length > 0 &&
                            <div>
                                {
                                    msg.options.map(option => <div key={Math.ceil(Math.random() * 1000)} className={styles.optionedMessage}>
                                        {option.optionText.trim() === "Request a call" ?
                                            <div>
                                                <button type="button" onClick={addIWantACallback}
                                                // Uncomment below this if the cta has to be disabled since its not latest message!
                                                //disabled={mIndex < messageStack.length -1 }
                                                >
                                                    {option.optionText}
                                                </button>
                                            </div>
                                            : <div>{option.optionText}</div>}
                                        <small>{option.optionSubText}</small>
                                    </div>
                                    )
                                }
                            </div>}
                    </div>
                </div>
            })}
        </section>
        <footer className={styles.chatFooter}>
            <textarea rows={2} placeholder="Type a Message..." className={styles.messageTypeBox}
                value={typedText} onChange={handleChatOnChange} />
            <button className={styles.rocketButton}
                disabled={!typedText}
                onClick={addToChatScreen}>
                <PaperAirplaneIcon className={styles.sendButtonIcon} />
            </button>
        </footer>
    </section>

}

export default ChatWindow;