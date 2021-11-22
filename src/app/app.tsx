import { useEffect, useState } from "react";
import { IChat } from "src/utils/viewModels";
import { fetchChatsInfo } from "../utils/apiCalls";
import styles from "./app.module.css";
import ChatWindow from "../components/chatExchangeWindow";
import ChatListWindow from "../components/chatListWindow";

const App = (): JSX.Element => {

  const [loaderText, setloaderText] = useState<boolean>(true);
  const [allChatItems, setChatItems] = useState<IChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  const selectThisChat = (chat: IChat) => setSelectedChat(chat);

  useEffect(() => {
    fetchChatsInfo().then(allChats => {
      setChatItems(allChats);
      setloaderText(false)
    });

    // eslint-disable-next-line
  }, []);

  return (
    <main className={styles.main}>
      <ChatListWindow
        selectedChat={selectedChat}
        selectThisChat={selectThisChat}
        loaderText={loaderText}
        allChatItems={allChatItems}
      />
      {selectedChat && <ChatWindow
        selectedChat={selectedChat}
      />}
    </main>
  );
};

export default App;
