import React, { useState } from 'react';
import { IWindowProps } from "../utils/viewModels";
import styles from './chatListWindow.module.css';
import { getLatestChatMessage } from "../utils/helpers"

const ChatListWindow = ({
    selectedChat,
    selectThisChat,
    loaderText,
    allChatItems
}: IWindowProps): JSX.Element => {

    const [filterValue, setfilterValue] = useState<string>("");


    const handleFilterOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setfilterValue(e.target?.value);
    }

    const filteredChatItems = allChatItems.filter(chat => chat.orderId.indexOf(filterValue) > -1 || chat.title.toLowerCase().indexOf(filterValue.toLowerCase()) > -1);

    return <section id="chat_list_section" className={!selectedChat ? styles.spanFull : styles.spanHalf}>
        <header className={styles.header}>
            <h3 className={styles.filterTitle}>Filter by Title / Order ID</h3>
            <div>
                <input
                    className={styles.filterBox}
                    type="text"
                    placeholder="Start typing to search"
                    value={filterValue}
                    onChange={handleFilterOnChange}
                    aria-label="chatfilter"
                />
            </div>
        </header>
        <section id="chats_listing" className={styles.chatListerCont}>
            {loaderText ? <div className={styles.chatItemContainer}>
                <div className={styles.chatInfo}>Loading Chats...</div>
            </div> :
                filteredChatItems.length > 0 ?
                    filteredChatItems.map(chat => {
                        const backLight = chat.id === selectedChat?.id ? { "backgroundColor": "#e6e6e6" } : {}
                        return <div key={chat.id}
                            onClick={() => selectThisChat(chat)}
                            className={styles.chatItemContainer}
                            style={backLight}>
                            <div className={styles.chatInfo}>
                                <div className={styles.thumbnailHolder}>
                                    <img className={styles.thumbnail} src={chat.imageURL} alt="item_image" width="25" height="25" loading="lazy" />
                                </div>
                                <div>
                                    <div>{chat.title}</div>
                                    <div>Order {chat.orderId}</div>
                                    {chat.messageList.length > 0 && <div className={styles.latestText}>{getLatestChatMessage(chat.messageList)}</div>}
                                </div>
                            </div>
                            <aside className={styles.dateItem}>
                                {chat.latestMessageTimestamp ? new Date(chat.latestMessageTimestamp).toLocaleString().split(',').shift() : ""}
                            </aside>
                        </div>
                    })
                    : <div className={styles.chatItemContainer}>
                        <div className={styles.chatInfo}>No Chats Found !</div>
                    </div>
            }
        </section>
    </section>
}

export default ChatListWindow